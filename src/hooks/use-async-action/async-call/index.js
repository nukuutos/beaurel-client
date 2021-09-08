import { setAlert } from "../../../redux/alert/actions";
import handleUnauthorizedCall from "./utils/handle-unauthorized-call";
import axios from "../../../utils/axios";
import Axios from "axios";

const asyncCall = async (dispatch, config) => {
  const { accessToken, addingHeaders, ...confingProps } = config;

  try {
    const { data } = await axios({
      ...confingProps,
      headers: {
        ...addingHeaders,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // console.log(data);

    return data;
  } catch (error) {
    if (Axios.isCancel(error)) {
      console.log("canceled");
      return null;
    }

    const { response } = error;

    // handle unauthorized error
    let data = null;
    if (response.status === 401) data = await handleUnauthorizedCall(dispatch, config);
    else dispatch(setAlert({ ...response.data }));

    return data;
  }
};

export default asyncCall;
