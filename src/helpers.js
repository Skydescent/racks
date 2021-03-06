const getCostByQntRange = (ranges, rangePropName, qnt) =>
  ranges.filter(item => {
    if (item[rangePropName] === 'all') {
      return true;
    }
    const [min, max] = item[rangePropName].split(':');
    return qnt > min && qnt < max;
  })[0].value * qnt;

export const getProductPropValues = (productPropValues, prop) => [
  ...new Set(
    productPropValues.map(item =>
      item.name ? { title: item.name, value: item[prop] } : item[prop]
    )
  ),
];

export const createActiveInputs = (
  productProps,
  group,
  changedPropName,
  changedPropValue,
  propName
) =>
  productProps[group]
    .filter(props => {
      if (props[changedPropName] !== changedPropValue) {
        return false;
      }
      return true;
    })
    .map(props => props[propName]);

export const calculateTotalPrice = (
  {
    shelf,
    rack,
    shelvesQuantity,
    racksQuantity,
    installation,
    delivery,
    subDelivery,
  },
  productProps
) => {
  const {
    depth: { value: depthValue },
    width: { value: widthValue },
  } = shelf;
  const {
    height: { value: heightValue },
    load: { value: loadValue },
  } = rack;

  const [{ price: shelfPrice }] = productProps.shelf.filter(item => {
    if (item.depth === depthValue && item.width === widthValue) {
      return true;
    }
    return false;
  });

  const [{ price: rackPrice }] = productProps.rack.filter(item => {
    if (item.height === heightValue && item.load === loadValue) {
      return true;
    }
    return false;
  });

  const installCost = productProps.installation
    .filter(item => installation.includes(item.type))
    .map(item =>
      item.price.length
        ? getCostByQntRange(item.price, 'shelvesQuantity', shelvesQuantity)
        : item.price
    )
    .reduce((accum, current) => accum + current);

  let deliveryCost = 0;
  if (delivery !== 'self_delivery') {
    deliveryCost += productProps.delivery.filter(
      item => item.type === delivery
    )[0].price;
    deliveryCost += productProps.subDelivery.filter(
      item => item.type === subDelivery
    )[0].price;
  }

  return (
    (shelvesQuantity * shelfPrice + rackPrice * 4 + installCost) *
      racksQuantity +
    deliveryCost
  );
};
