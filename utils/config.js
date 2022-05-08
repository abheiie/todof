const API_PRODUCTION_URL = 'http://127.0.0.1:8000';
const API_DEV_URL = 'http://127.0.0.1:8000';
export const Config = {
    API_URL: process.env.NODE_ENV === 'production' ? API_PRODUCTION_URL : API_DEV_URL,
};
