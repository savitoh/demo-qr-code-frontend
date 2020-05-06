
import { getNameFileFromContentDispositionHeader } from "../utils/headers-utils";


const API_QR_CODE_URL = process.env.API_QR_CODE_URL;

const requestHeaders = new Headers({
    'Content-Type': 'application/json'
});

const requestOptions = { method: 'POST',
                         headers: requestHeaders};

const createQrCodeRequestPayload = (urlTarget) => {
    return JSON.stringify({uriTarget: urlTarget});
}

const downloadQrCode = async (qrCodeRequestPayload) => {
    requestOptions['body'] = qrCodeRequestPayload; 
    let fileName;
    await fetch(API_QR_CODE_URL, requestOptions)
        .then(response => {
            const responseHeaders = response.headers;
            fileName = getNameFileFromContentDispositionHeader(responseHeaders);
            return response.blob();
        })
        .then(blob => URL.createObjectURL(blob))
        .then(url => {
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.setAttribute('download', fileName);
            anchor.click();
            URL.revokeObjectURL(url);
        })
}


export {downloadQrCode, createQrCodeRequestPayload};