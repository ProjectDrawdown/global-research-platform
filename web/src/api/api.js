import dataConfig from "./data/data_config";
import { API_URL } from "config";

const WORKBOOK_API_URL = API_URL + "/workbook";
const CALCULATIONS_API_URL = API_URL + "/calculate";
const CLUSTER_CALCULATIONS_API_URL = API_URL + "/calculate/cluster";
const WORKBOOKS_API_URL = API_URL + "/workbooks";
const USER_INFO_URL = API_URL + "/me";
const AUTH_API_URL = API_URL + "/login";
const REFRESH_TOKEN_URL = API_URL + "/refresh-token";
const AUTHENTICATE_API_URL = API_URL + "/authorize";
const VMA_CALCULATION_API_URL = API_URL + "/vma/calculation";
const VMA_MAPPING_API_URL = API_URL + "/vma/mappings";
const RESOURCE_URL = API_URL + "/resource";
const VMA_CVS_URL = API_URL + "/vma_csv";

const addAuth = headers => {
  const token = localStorage.getItem("token");
  return { ...headers, Authorization: "Bearer " + token };
};

export const fetchWorkbook = async workbookId => {
  const data = await fetch(WORKBOOK_API_URL + "/" + workbookId);
  const res = await data.json();
  return res;
};

export const cloneWorkbook = async workbookId => {
  const response = await fetch(WORKBOOK_API_URL + "/" + workbookId, {
    method: "POST",
    headers: addAuth({})
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    return Promise.reject(response);
  }
};

export const patchWorkbook = async (workbookId, payload) => {
  const response = await fetch(WORKBOOK_API_URL + "/" + workbookId, {
    method: "PATCH",
    body: JSON.stringify(payload),
    headers: addAuth({})
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    return Promise.reject(response);
  }
};

export const runCalculation = async (workbookId, variationIndex) => {
  const res = await fetch(
    CALCULATIONS_API_URL +
      "?run_async=true&workbook_id=" +
      workbookId +
      "&variation_index=" +
      variationIndex
  );
  const dataJson = await res.json();
  return dataJson;
};

export const runClusterCalculation = async (workbookId, variationIndex) => {
  const res = await fetch(
    CLUSTER_CALCULATIONS_API_URL +
      "?run_async=true&workbook_id=" +
      workbookId +
      "&variation_index=" +
      variationIndex
  );
  const dataJson = await res.json();
  return dataJson;
}

export const fetchProjection = async id => {
  const res = await fetch(id);
  const dataJson = await res.json();
  return dataJson;
};

export const fetchUser = async () => {
  const res = await fetch(USER_INFO_URL, {
    method: "GET",
    headers: addAuth({})
  });
  const data = await res.json();
  return data;
};

export const patchUser = async (payload) => {
  const response = await fetch(USER_INFO_URL, {
    method: "PATCH",
    body: JSON.stringify(payload),
    headers: addAuth({})
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    return Promise.reject(response);
  }
};

export const login = async provider => {
  const res = await fetch(`${AUTH_API_URL}/${provider}`);
  const data = await res.json();
  return data;
};

export const refreshToken = async provider => {
  const res = await fetch(`${REFRESH_TOKEN_URL}/${provider}`, {
    method: "POST",
    headers: addAuth({})
  });
  const response = await res.json();
  return response;
};

export const fetchWorkbooks = async () => {
  const res = await fetch(WORKBOOKS_API_URL, {
    method: "GET",
    headers: addAuth({})
  });
  const data = await res.json();
  return data;
};

export const fetchData = async id => {
  const res = await fetch(id, {
    method: "GET",
    headers: addAuth({})
  });
  const data = await res.json();
  return data;
};

export const updateVariation = async (opts, data) => {
  const res = await fetch(
    WORKBOOK_API_URL +
      "/" +
      opts.workbookId +
      "/variation/" +
      opts.variationIndex,
    {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: addAuth({})
    }
  );
  if (res.ok) {
    const response = await res.json();
    return response;
  } else {
    const response = await res.json();
    return Promise.reject(response);
  }
};

export const authenticate = async (code, provider) => {
  const res = await fetch(`${AUTHENTICATE_API_URL}/${provider}`, {
    method: "POST",
    body: JSON.stringify({
      code,
      state: 0
    })
  });
  const response = await res.json();
  return response;
};


/**
 * Get the calculation of a given variable's VMA.
 */
export const fetchVarpathFullVMACalculation = async ({ varpathFull, useCorrected = false, useWeight = false, technologyId, sectorId, conventionalId }) => {
  // Make our request string
  const searchParams = {
    variable: varpathFull.replace(/\.value/,""),
    stat_correction: useCorrected,
    use_weight: useWeight,
  };
  const url = new URL(VMA_CALCULATION_API_URL);
  url.search = new URLSearchParams(searchParams).toString();

  // Send and handle request
  const result = await fetch(url);
  if (result.ok) {
    const response = await result.json();
    return response;
  } else {
    const response = await result.json();
    return Promise.reject(response);
  }
};

export const fetchTechnologyVMAMappings = async technologyID => {
  const result = await fetch(VMA_MAPPING_API_URL + "/" + technologyID);
  if (result.ok) {
    const response = await result.json();
    return response;
  } else {
    const response = await result.json();
    return Promise.reject(response);
  }
};

export const fetchResourceURL = async resourceURL => {
  const result = await fetch(resourceURL);
  if (result.ok) {
    const response = await result.json();
    return response;
  } else {
    const response = await result.json();
    return Promise.reject(response);
  }
};

export const uploadResource = async (data, entity, technology) => {
  const result = await fetch(`${RESOURCE_URL}/${entity}/${technology}`, {
    method: 'POST',
    headers: addAuth({}),
    body: data
  });

  if (result.ok) {
    const response = await result.json();
    return response;
  }else {
    const response = await result.json();
    return Promise.reject(response);
  }
}

export const uploadVMA = async (data) => {
  const result = await fetch(`${VMA_CVS_URL}`, {
    method: 'POST',
    headers: addAuth({}),
    body: data
  });

  if (result.ok) {
    const response = await result.json();
    return response;
  }else {
    const response = await result.json();
    return Promise.reject(response);
  }
}

export const fetchResources = async (id, entity) => {
  const result = await fetch(`${RESOURCE_URL}/${entity}s/paths`);
  if (result.ok) {
    const response = await result.json();
    return response;
  } else {
    const response = await result.json();
    return Promise.reject(response);
  }
};

export { 
  dataConfig,
};
