'use strict';

import './main.css';

import {createQrCode, createQrCodeRequestPayload}  from './js/http/client-api-qrcode.js';
import { openToast } from './js/component/toast';


const elementInputUrl = document.querySelector('#input-url');
const elementBtnGenerateQrCode = document.querySelector('#btn-generate-qrcode');
const elementBtnCleanInputUrl = document.querySelector('#btn-clean-input-url');

const elementSpinnerId = 'spinner';

elementInputUrl.addEventListener('input', () => {
    const url = elementInputUrl.value;
    habilitaDesabilitaBtns(url);
});

elementBtnCleanInputUrl.addEventListener('click', () => {
    elementInputUrl.value = null;
    desabilitaBtns();
});


elementBtnGenerateQrCode.addEventListener('click', async () => {
    const url = elementInputUrl.value;
    const qrcodeRequestPayload =  createQrCodeRequestPayload(url);
    addSpinnerInBtn(elementBtnGenerateQrCode);
    await createQrCode(qrcodeRequestPayload)
        .then(response => downloadQrCode(response))
        .catch(error => analiseErroDownloadQrCode(error));
    removeSpinner(elementBtnGenerateQrCode);
})

const downloadQrCode = (qrCode) => {
    const url = URL.createObjectURL(qrCode.file);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.setAttribute('download', qrCode.fileName);
    anchor.click();
    URL.revokeObjectURL(url);
}

const analiseErroDownloadQrCode = async (error) => {
    await error.json()
        .then(errorResponse => openToast(errorResponse.error))
        .catch(error => console.log(error));
}

const desabilitaBtns = () => {    
    elementBtnCleanInputUrl.disabled = true;
    elementBtnGenerateQrCode.disabled = true;
}

const habilitaBtns = () => {
    elementBtnCleanInputUrl.disabled = false;
    elementBtnGenerateQrCode.disabled = false;
}

const habilitaDesabilitaBtns = (value) => {
    if(value) {
        habilitaBtns();    
        return;
    }
    desabilitaBtns();
}

const addSpinnerInBtn = (button) => {
    const firstChild = button.childNodes[0];
    const spinner = createSpinner();
    firstChild ? button.insertBefore(spinner, firstChild) :  button.appendChild(spinner);
}

const removeSpinner = (button) => {
    const elementSpinner = document.querySelector(`#${elementSpinnerId}`);
    button.removeChild(elementSpinner);
    elementSpinner.remove();
}

const createSpinner = () => {
    const spinner = document.createElement('i');
    spinner.setAttribute('id', elementSpinnerId);
    const vectorSpinnerCssClass = ['fa', 'fa-refresh', 'fa-spin'];
    vectorSpinnerCssClass.forEach(classCss => spinner.classList.add(classCss));
    return spinner;
}