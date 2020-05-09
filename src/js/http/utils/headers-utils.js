'use strict';   

const  headerContentDisposition = 'Content-Disposition';

const getFileNameFromContentDispositionHeader  = (headers) => {
    if(headers instanceof Headers && headers.has(headerContentDisposition)) {
        const fileName =  headers.get('Content-Disposition')
                            .split(';')
                            .find(str => str.includes('filename='))
                            .replace('filename=', '')
                            .replace(/"/g, '')
                            .trim();
        return fileName;
    }
    throw Error(`The ${headers} provided arguments are not Headers`);
}

export {getFileNameFromContentDispositionHeader};