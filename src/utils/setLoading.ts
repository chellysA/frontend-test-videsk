export const setLoading = (value: boolean) => {
  setTimeout(
    () => {
      document
        .querySelector("loader-component")
        ?.setAttribute("open", `${value}`);
    },
    value ? 0 : 500
  );
};
