'use strict';

import './main.css';

import {downloadQrCode, createQrCodeRequestPayload}  from './js/http/client-api-qrcode.js';


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


elementBtnGenerateQrCode.addEventListener('click', () => {
    const url = elementInputUrl.value;
    const qrcodeRequestPayload =  createQrCodeRequestPayload(url);
    downloadQrCode(qrcodeRequestPayload);
})

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