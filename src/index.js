'use strict';

import './main.css';

import {createQrCode, createQrCodeRequestPayload}  from './js/http/client-api-qrcode.js';
import { openToast } from './js/component/toast';


const elementInputUrl = document.querySelector('#input-url');
const elementBtnGenerateQrCode = document.querySelector('#btn-generate-qrcode');
const elementBtnCleanInputUrl = document.querySelector('#btn-clean-input-url');

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
    await createQrCode(qrcodeRequestPayload)
        .then(response => downloadQrCode(response))
        .catch(error => analiseErroDownloadQrCode(error));
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