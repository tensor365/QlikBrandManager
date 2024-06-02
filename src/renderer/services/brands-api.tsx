import  {AxiosError, AxiosInstance,  InternalAxiosRequestConfig, AxiosResponse} from "axios";
import Axios from "axios";

const requestHandler = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    
    config.headers['Accept-Language'] = 'en-US,en;q=0.9,fr-FR;q=0.8,fr;q=0.7';
    if (!config.headers['Authorization']) {
        const token = localStorage.getItem('qlikToken');
        config.headers['Authorization'] = 'Bearer ' + token;
    }
    config.headers

    return config;
};

const requestErrorHandler = (error:AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
};

const responseHandler = (response:AxiosResponse): AxiosResponse => {
    console.log(response);
    return response;
};

const responseErrorHandler = (error: AxiosError):Promise<AxiosError> => {
    console.error(`Status =[ : ${error.response.status}`);
    return Promise.reject(error);
};

const createAxiosInstance = () => {
    const baseURL = localStorage.getItem('qlikTenant') || '';
    const axiosInstance = Axios.create({baseURL: baseURL});  
    axiosInstance.interceptors.request.use(requestHandler, requestErrorHandler);
    axiosInstance.interceptors.response.use(responseHandler, responseErrorHandler);
  
    return axiosInstance;
  };

export const getUserInfo = async () => {
    const axios = createAxiosInstance();
    return axios({url:'/api/v1/users/me', method: 'GET'})
}

export const getBrandList = async () => {
    const axios = createAxiosInstance();
    return axios({url:'/api/v1/brands', method: 'GET'})
}

export const  deleteBrandList = async (brandId: string) => {
    const axios = createAxiosInstance();
    axios({url:`/api/v1/brands/${brandId}`, method: 'DELETE'})
}

export const  activateBrandList = async (brandId: string) => {
    const axios = createAxiosInstance();
    axios({url:`/api/v1/brands/${brandId}/actions/activate`, method: 'POST'})
}

export const  deactivateBrandList = async (brandId: string) => {
    const axios = createAxiosInstance();
    axios({url:`/api/v1/brands/${brandId}/actions/deactivate`, method: 'POST'})
}

export const createBrandList =  (brandName: string, favIcon: any, logo: any) => {
    const axios = createAxiosInstance();

    const headers= {
        "Content-Type": "multipart/form-data",
      }

      const formData = new FormData();
      formData.append("name", brandName);
      formData.append("favIcon", favIcon);
      formData.append("logo", logo);
      

    axios({url:'/api/v1/brands', method: 'POST', data: formData, headers: headers})
}

