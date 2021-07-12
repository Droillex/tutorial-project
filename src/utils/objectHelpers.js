export const updateWithNewProps = (
  items,
  objectProp,
  compareValue,
  newProps
) => {
  return items.map((item) => {
    if (item[objectProp] === compareValue) {
      item = { ...item, ...newProps };
    }
    return item;
  });
};
