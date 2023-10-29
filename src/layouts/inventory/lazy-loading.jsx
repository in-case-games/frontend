const LazyLoading = async (props) => {
  let loaded = props.loaded;
  let additional = [];

  let start = (props.page - 1) * 20;
  let end = start + 20;

  if (end > props.primary.length) end = props.primary.length;
  if (start > props.primary.length) start = end >= 20 ? end - 20 : 0;
  if (start < 0) start = 0;

  if (props.isAllReload || start > loaded.length - 1)
    additional = await props.additionalLoading(props.primary, start, end);

  if (start > loaded.length - 1) loaded = [...loaded, ...additional];
  else if (props.isAllReload && end <= loaded.length) {
    let i = 0;

    for (let j = start; j < end; j++) {
      loaded[j] = additional[i];
      i++;
    }
  } else
    Array.prototype.splice.apply(
      loaded,
      [0, additional.length].concat(additional)
    );

  try {
    const show = props.createShowByLoaded(loaded, start, end);

    props.setLoaded(loaded);
    props.setShow(show);
  } catch (err) {
    props.backAll();
  }
};

export default LazyLoading;
