'use strict';

import { getFileNameFromContentDispositionHeader } from "./utils/headers-utils";


const contextPathApiQrCode = '/api/v1/qrcodes';

const API_QR_CODE_URL = `${process.env.API_QR_CODE_URL}${contextPathApiQrCode}`;

const requestHeaders = new Headers({
    'Content-Type': 'application/json'
});

const requestOptions = { method: 'POST',
                         headers: requestHeaders};

const createQrCodeRequestPayload = (urlTarget) => {
    return JSON.stringify({uriTarget: urlTarget});
}

const createQrCode = async (qrCodeRequestPayload) => {
    requestOptions['body'] = qrCodeRequestPayload;
    const response = await fetch(API_QR_CODE_URL, requestOptions);
    if(response.ok) {
        const responseHeaders = response.headers;
        const fileName = getFileNameFromContentDispositionHeader(responseHeaders);
        return await response.blob()
            .then(blob => {
                return {
                    file: blob,
                    fileName: fileName
                }
            });
    }
    return Promise.reject(response);
}


export {createQrCode, createQrCodeRequestPayload};