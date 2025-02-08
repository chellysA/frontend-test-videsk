export const setLoading = (value: boolean) => {
  document.querySelector("loader-component")?.setAttribute("open", `${value}`);
};
