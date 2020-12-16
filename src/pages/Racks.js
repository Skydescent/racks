import React, { useState } from 'react';
import InputsField from '../components/InputsField';
import QuantitySlider from '../components/QuantitySlider';
import Total from '../components/Total';

import {
  getProductPropValues,
  createActiveInputs,
  calculateTotalPrice,
} from '../helpers';

import { racksProps, initialRack } from '../products/racks';

const Racks = () => {
  const [currentInputsValue, setInputsValue] = useState(initialRack);

  const handleInputChange = (propGroup, propName, value) => {
    setInputsValue(prev => {
      const newRack = { ...prev };
      if (['installation', 'delivery', 'subDelivery'].includes(propGroup)) {
        newRack[propGroup] = value;
      } else {
        const relatedProp = Object.keys(prev[propGroup]).filter(
          relatedPropName => relatedPropName !== propName
        )[0];

        const newActiveInputs = createActiveInputs(
          racksProps,
          propGroup,
          propName,
          value,
          relatedProp
        );

        newRack[propGroup][propName].value = value;
        newRack[propGroup][relatedProp].active = newActiveInputs;
      }
      newRack.total = calculateTotalPrice(newRack, racksProps);
      return newRack;
    });
  };

  const handleQuantitySliderMove = (propGroup, value) => {
    setInputsValue(prev => {
      const newRack = { ...prev };
      newRack[propGroup] = value;
      newRack.total = calculateTotalPrice(newRack, racksProps);
      return newRack;
    });
  };

  const renderInputsField = (propGroup, propName, title) => {
    const propValues = getProductPropValues(racksProps[propGroup], propName);

    let activeInputs = null;
    let currentValue = currentInputsValue[propGroup];

    if (
      currentInputsValue[propGroup][propName] &&
      currentInputsValue[propGroup][propName].value &&
      currentInputsValue[propGroup][propName].active
    ) {
      currentValue = currentInputsValue[propGroup][propName].value;
      activeInputs = currentInputsValue[propGroup][propName].active;
    }

    return (
      <InputsField
        title={title}
        propGroup={propGroup}
        propName={propName}
        propValues={propValues}
        activeInputs={activeInputs}
        currentValue={currentValue}
        handleInputChange={handleInputChange}
      />
    );
  };

  const renderQuantitySliderMove = (title, min, max, step, name, propGroup) => {
    const currentValue = currentInputsValue[propGroup];
    return (
      <QuantitySlider
        title={title}
        min={min}
        max={max}
        step={step}
        name={name}
        handleQuantitySliderMove={handleQuantitySliderMove}
        propGroup={propGroup}
        currentValue={currentValue}
      />
    );
  };

  return (
    <div>
      <section className="calc-bg">
        <div className="calc">
          <div>Изображение</div>
          <div>
            {renderInputsField('rack', 'height', 'Высота стеллажа, см')}
            {renderInputsField('shelf', 'depth', 'Глубина полки см')}
            {renderInputsField('shelf', 'width', 'Ширина полки, см')}
            {renderInputsField('rack', 'load', 'Нагрузка на стеллаж, кг')}
            <div className="flex grid_2 range">
              {renderQuantitySliderMove(
                'Количество полок',
                2,
                10,
                1,
                'shelf',
                'shelvesQuantity'
              )}
              {renderQuantitySliderMove(
                'Количество стеллажей',
                1,
                10,
                1,
                'rack',
                'racksQuantity'
              )}
            </div>
            <div className="total">
              <Total
                total={currentInputsValue.total}
                deliveryType={currentInputsValue.delivery}
              />
              {renderInputsField('delivery', 'type', 'Доставка')}
              {currentInputsValue.delivery === 'self_delivery' ||
                renderInputsField('subDelivery', 'type', '')}
              {renderInputsField('installation', 'type', 'Сборка')}
            </div>
          </div>
        </div>
      </section>
      <section>Второй блок</section>
    </div>
  );
};

export default Racks;
