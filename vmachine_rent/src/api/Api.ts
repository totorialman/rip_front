/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface VmachineRequestService {
  /** ID */
  id?: number;
  /**
   * Количество
   * @min 0
   * @max 2147483647
   */
  quantity?: number;
  /** Основная услуга */
  is_main?: boolean;
  /**
   * Порядок
   * @min -2147483648
   * @max 2147483647
   */
  order?: number | null;
  /** Заявка */
  request?: number;
  /** Услуга */
  service?: number;
}

export interface User {
  /**
   * Username
   * @minLength 1
   * @maxLength 150
   */
  username: string;
  /**
   * Пароль
   * @minLength 1
   * @maxLength 150
   */
  password: string;
  /**
   * Is staff
   * @default false
   */
  is_staff?: boolean;
  /**
   * Is superuser
   * @default false
   */
  is_superuser?: boolean;
}

export interface VmachineRequest {
  /** ID */
  id?: number;
  /** Статус */
  status?: "draft" | "deleted" | "formed" | "completed" | "rejected";
  /**
   * Дата создания
   * @format date-time
   */
  created_at?: string;
  /**
   * Дата формирования
   * @format date-time
   */
  formed_at?: string | null;
  /**
   * Дата завершения
   * @format date-time
   */
  completed_at?: string | null;
  /**
   * Creator
   * @minLength 1
   */
  creator?: string;
  /**
   * Moderator
   * @minLength 1
   */
  moderator?: string;
  /** ФИО */
  full_name?: string | null;
  /** Почта */
  email?: string | null;
  /**
   * С какого числа
   * @format date
   */
  from_date?: string | null;
  /**
   * Итоговая цена
   * @format decimal
   */
  final_price?: string | null;
}

export interface VmachineService {
  /** ID */
  id?: number;
  /**
   * Название виртуальной машины
   * @minLength 1
   * @maxLength 255
   */
  name?: string;
  /**
   * Цена
   * @format decimal
   */
  price?: string;
  /**
   * Описание
   * @minLength 1
   */
  description?: string;
  /**
   * Техническое описание
   * @minLength 1
   */
  description_tech?: string;
  /**
   * VCPU
   * @minLength 1
   * @maxLength 50
   */
  vcpu?: string;
  /**
   * ОЗУ
   * @minLength 1
   * @maxLength 50
   */
  ram?: string;
  /**
   * SSD
   * @minLength 1
   * @maxLength 50
   */
  ssd?: string;
  /** Статус */
  status?: "active" | "deleted";
  /**
   * Изображение
   * @maxLength 255
   */
  url?: string | null;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
  credentials?: RequestCredentials;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://127.0.0.1:8000" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Snippets API
 * @version v1
 * @license BSD License
 * @termsOfService https://www.google.com/policies/terms/
 * @baseUrl http://127.0.0.1:8000
 * @contact <contact@snippets.local>
 *
 * Test description
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  createRent = {
    /**
     * No description
     *
     * @tags create-rent
     * @name CreateRentCreate
     * @request POST:/create-rent/
     * @secure
     */
    createRentCreate: (data: VmachineRequestService, params: RequestParams = {}) =>
      this.request<VmachineRequestService, any>({
        path: `/create-rent/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  login = {
    /**
     * No description
     *
     * @tags login
     * @name LoginCreate
     * @request POST:/login/
     * @secure
     */
    loginCreate: (data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/login/`,
        method: "POST",
        credentials: "include",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  logout = {
    /**
     * No description
     *
     * @tags logout
     * @name LogoutDelete
     * @request DELETE:/logout/
     * @secure
     */
    logoutDelete: (data?: User, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/logout/`,
        method: "DELETE",
        body: data,
        secure: true,
        ...params,
      }),
  };
  register = {
    /**
     * No description
     *
     * @tags register
     * @name RegisterCreate
     * @request POST:/register/
     * @secure
     */
    registerCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/register/`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags register
     * @name RegisterUpdate
     * @request PUT:/register/{id}/
     * @secure
     */
    registerUpdate: (pk: string,body: { password: string }, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/register/${pk}/`, // Используем username вместо id
        method: "PUT",
        secure: true,
        body,
        ...params,
      }),
  };
  rentFormed = {
    /**
     * No description
     *
     * @tags update_status
     * @name UpdateStatus
     * @request PUT:/rent-formed/{id}/
     * @secure
     */
    updateStatus: (data: VmachineRequest, params: RequestParams = {}) =>
      this.request<VmachineRequest, any>({
        path: `/rent-formed/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  rentList = {
    /**
     * No description
     *
     * @tags get_list
     * @name GetList
     * @request GET:/rent-list/
     * @secure
     */
    getList: (params: RequestParams = {}) =>
      this.request<VmachineRequest[], any>({
        path: `/rent-list/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    getListAll: (params: RequestParams = {}) =>
      this.request<VmachineRequest[], any>({
        path: `/rent-list-all/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags rent-list
     * @name RentListCreate
     * @request POST:/rent-list/{request_id}/
     * @secure
     */
    rentListCreate: (data: VmachineRequestService, params: RequestParams = {}) =>
      this.request<VmachineRequestService, any>({
        path: `/rent-list1/`,
        method: "POST",
        withCredentials: true,
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  rentVmachines = {
    /**
     * No description
     *
     * @tags rent-vmachines
     * @name RentVmachinesList
     * @request GET:/rent-vmachines/
     * @secure
     */
    rentVmachinesList: (params: RequestParams = {}) =>
      this.request<VmachineRequestService[], any>({
        path: `/rent-vmachines/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags rent-vmachines
     * @name RentVmachinesCreate
     * @request POST:/rent-vmachines/
     * @secure
     */
    rentVmachinesCreate: (data: VmachineRequestService, params: RequestParams = {}) =>
      this.request<VmachineRequestService, any>({
        path: `/rent-vmachines/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags rent-vmachines
     * @name RentVmachinesRead
     * @request GET:/rent-vmachines/{id}/
     * @secure
     */
    rentVmachinesRead: (id: number, params: RequestParams = {}) =>
      this.request<VmachineRequestService, any>({
        path: `/rent-vmachines/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags rent-vmachines
     * @name RentVmachinesUpdate
     * @request PUT:/rent-vmachines/{id}/
     * @secure
     */
    rentVmachinesUpdate: (id: number, data: VmachineRequestService, params: RequestParams = {}) =>
      this.request<VmachineRequestService, any>({
        path: `/rent-vmachines/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags rent-vmachines
     * @name RentVmachinesPartialUpdate
     * @request PATCH:/rent-vmachines/{id}/
     * @secure
     */
    rentVmachinesPartialUpdate: (id: number, data: VmachineRequestService, params: RequestParams = {}) =>
      this.request<VmachineRequestService, any>({
        path: `/rent-vmachines/${id}/`,
        method: "PATCH",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags rent-vmachines
     * @name RentVmachinesDelete
     * @request DELETE:/rent-vmachines/{id}/
     * @secure
     */
    rentVmachinesDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/rent-vmachines/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags rent-vmachines
     * @name RentVmachinesDeleteService
     * @request DELETE:/rent-vmachines/{id}/delete_service/
     * @secure
     */
    rentVmachinesDeleteService: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/rent-vmachines/${id}/delete_service/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags rent-vmachines
     * @name RentVmachinesUpdateService
     * @request PUT:/rent-vmachines/{id}/update_service/
     * @secure
     */
    rentVmachinesUpdateService: (id: number, data: VmachineRequestService, params: RequestParams = {}) =>
      this.request<VmachineRequestService, any>({
        path: `/rent-vmachines/${id}/update_service/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  rentalList = {
    /**
     * No description
     *
     * @tags rental-list
     * @name RentalListRead
     * @request GET:/rental-list/{id}/
     * @secure
     */
    rentalListRead: (id: number, params: RequestParams = {}) =>
      this.request<VmachineRequest, any>({
        path: `/rental-list/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags rental-list
     * @name RentalListUpdate
     * @request PUT:/rental-list/{id}/
     * @secure
     */
    rentalListUpdate: (data: VmachineRequest, params: RequestParams = {}) =>
      this.request<VmachineRequest, any>({
        path: `/rental-list/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags rental-list
     * @name RentalListDelete
     * @request DELETE:/rental-list/{id}/
     * @secure
     */
    rentalListDelete: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/rental-list/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags rental-list
     * @name RentalListUpdateStatusModer
     * @request PUT:/rental-list/{id}/status/
     * @secure
     */
    rentalListUpdateStatusModer: (id: number, data: VmachineRequest, params: RequestParams = {}) =>
      this.request<VmachineRequest, any>({
        path: `/rental-list/${id}/status/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags rental-list
     * @name RentalListUpdateServiceRelation
     * @request PUT:/rental-list/{id}/update-vmachine/
     * @secure
     */
    rentalListUpdateServiceRelation: (id: number, data: VmachineRequest, params: RequestParams = {}) =>
      this.request<VmachineRequest, any>({
        path: `/rental-list/${id}/update-vmachine/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  user = {
    /**
     * @description Класс, описывающий методы работы с пользователями Осуществляет связь с таблицей пользователей в базе данных
     *
     * @tags user
     * @name UserList
     * @request GET:/user/
     * @secure
     */
    userList: (params: RequestParams = {}) =>
      this.request<User[], any>({
        path: `/user/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Функция регистрации новых пользователей Если пользователя c указанным в request  ещё нет, в БД будет добавлен новый пользователь.
     *
     * @tags user
     * @name UserCreate
     * @request POST:/user/
     * @secure
     */
    userCreate: (data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/user/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Класс, описывающий методы работы с пользователями Осуществляет связь с таблицей пользователей в базе данных
     *
     * @tags user
     * @name UserRead
     * @request GET:/user/{id}/
     * @secure
     */
    userRead: (id: number, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/user/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Класс, описывающий методы работы с пользователями Осуществляет связь с таблицей пользователей в базе данных
     *
     * @tags user
     * @name UserUpdate
     * @request PUT:/user/{id}/
     * @secure
     */
    userUpdate: (id: number, data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/user/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Класс, описывающий методы работы с пользователями Осуществляет связь с таблицей пользователей в базе данных
     *
     * @tags user
     * @name UserPartialUpdate
     * @request PATCH:/user/{id}/
     * @secure
     */
    userPartialUpdate: (id: number, data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/user/${id}/`,
        method: "PATCH",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Класс, описывающий методы работы с пользователями Осуществляет связь с таблицей пользователей в базе данных
     *
     * @tags user
     * @name UserDelete
     * @request DELETE:/user/{id}/
     * @secure
     */
    userDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/user/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  vmachine = {
    /**
     * No description
     *
     * @tags vmachine
     * @name VmachineCreate
     * @request POST:/vmachine/
     * @secure
     */
    vmachineCreate: (data: VmachineRequestService, params: RequestParams = {}) =>
      this.request<VmachineRequestService, any>({
        path: `/vmachine/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  vmachines = {
    /**
     * No description
     *
     * @tags vmachines
     * @name VmachinesList
     * @request GET:/vmachines/
     * @secure
     */
    vmachinesList: (
      query?: {
        /** Filter virtual machines by price. Only services with price <= vmachine_price will be returned. */
        vmachine_price?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** List of active virtual machine services */
          vmachines?: {
            id?: number;
            name?: string;
            price?: number;
          }[];
          /** ID of the first draft request, if any */
          rent_id?: number;
          /** Count of virtual machines in the draft request */
          vmachine_count?: number;
        },
        void
      >({
        path: `/vmachines/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags vmachines
     * @name VmachinesRead
     * @request GET:/vmachines/{id}/
     * @secure
     */
    vmachinesRead: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/vmachines/${id}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags vmachines
     * @name VmachinesCreate
     * @request POST:/vmachines/{id}/
     * @secure
     */
    vmachinesCreate: (id: string, data: VmachineService, params: RequestParams = {}) =>
      this.request<VmachineService, any>({
        path: `/vmachines/${id}/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags vmachines
     * @name VmachinesUpdate
     * @request PUT:/vmachines/{id}/
     * @secure
     */
    vmachinesUpdate: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/vmachines/${id}/`,
        method: "PUT",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags vmachines
     * @name VmachinesDelete
     * @request DELETE:/vmachines/{id}/
     * @secure
     */
    vmachinesDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/vmachines/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
}
