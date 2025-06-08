import { useContext } from "preact/hooks";
import { SnackbarContext } from "../components/SnackbarProvider";

export function useSnackbar() {
  return useContext(SnackbarContext);
}
