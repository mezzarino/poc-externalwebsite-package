"use server";

const headers = import('next/headers');

const getHeaderNonce = async () => {
    const headersList = (await headers).headers();
    const headerNonceValue = headersList.get('x-nonce') || '';

    return headerNonceValue;
};

export default getHeaderNonce;