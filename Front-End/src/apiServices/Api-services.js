import { ErrorToast } from "../helperClass/toaster";
import axios from "axios";
import { showLoader, hideLoader } from "../redux/slice-state/loaderSlice";
import { setRows, setTotal } from "../redux/slice-state/productsSlice";
import store from "../redux/store/store";

let BaseURL = "http://localhost:5000/api/v1/";

export async function GetProducts(pageNo, perPage, searchValue) {
  store.dispatch(showLoader());
  let URL =
    BaseURL + "/ProductList/" + pageNo + "/" + perPage + "/" + searchValue;

  try {
    let result = await axios.get(URL);
    console.log("From API:", result);
    store.dispatch(hideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      if (result.data["data"][0]["Rows"].length > 0) {
        store.dispatch(setRows(result.data["data"][0]["Rows"]));
        store.dispatch(setTotal(result.data["data"][0]["Total"][0]['count']));
      } else {
        store.dispatch(setRows([]));
        store.dispatch(setTotal("0"));
        ErrorToast("No Data Found");
      }
    } else {
      ErrorToast("Something went Wrong!");
    }
  } catch (error) {
    ErrorToast("Something went Wrong!");
    store.dispatch(hideLoader());
  }
}
