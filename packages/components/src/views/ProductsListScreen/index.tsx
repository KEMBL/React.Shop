import React, { useLayoutEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { StyleSheet, View, StatusBar, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Configuration, ProductCategoryModel, ProductCategoryModelWithProducts } from 'rns-types';
import { selectConfiguration, category, ui } from 'rns-packages';
import { Theme } from 'rns-theme';

import { TopDownGradient } from 'components/src/trivial/icons/gradients/TopDownGradient';
import { ProductUtils } from 'components/src/utils';
import { CardsSection, ProductCardModel } from 'components/src/advanced/CardsSection';
import { ShoppingCartButton } from 'components/src/advanced/buttons/ShoppingCartButton';

/**
 * Shows products inside given category
 *
 * @returns {object} see description
 */
export const ProductsListScreen: React.FC = () => {
  const navigation = useNavigation();
  const currentProductId = useSelector(ui.selectCurrentProductId);
  const configuration = useSelector(selectConfiguration, shallowEqual);
  const categories = useSelector(category.selectors.selectCurrentCategoryCategories, shallowEqual);

  useLayoutEffect(() => {
    if (currentProductId) {
      navigation.navigate('ProductPage');
      //TODO: Not so good solution, we will get out from condition below that hook but still
      // have to initialize unnecessary selectors from a start of this component :( is it performant?
    }
  }),
    [currentProductId];

  if (currentProductId) {
    return null; // need because user will be bypassed to the product page from above hook
  }

  // console.log('categories', categories);
  const mainStyle = StyleSheet.create({
    container: {
      backgroundColor: 'skyblue',
      height: Theme.platform.deviceHeight
    }
  });

  const keyExtractor = (_item: ProductCategoryModel, index: number): string => {
    return index.toString();
  };

  return (
    <View style={mainStyle.container}>
      <StatusBar backgroundColor="#016C4C" barStyle="light-content" />
      <View style={{ height: 94, backgroundColor: '#01875F', display: 'flex', justifyContent: 'center' }}>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
          <View style={{ marginRight: 15 }}>
            <ShoppingCartButton />
          </View>
        </View>
      </View>
      <View
        style={{
          height: 51,
          backgroundColor: 'white'
        }}
      />
      <View
        style={{
          height: '100%',
          backgroundColor: '#EEEEEE',
          flex: 1
        }}>
        <TopDownGradient width="100%" height={7} topColor="#BFBFBF" bottomColor="#EEEEEE" />
        <FlatList<ProductCategoryModelWithProducts>
          data={categories}
          pagingEnabled={true}
          showsVerticalScrollIndicator={false}
          keyExtractor={keyExtractor}
          renderItem={({ item }): JSX.Element => renderCategory(item, configuration)}
        />
      </View>
    </View>
  );
};

/**
 * Prepares inforrmation about each product card before send it cards renderer for a given category
 *
 * @param item category with products
 * @param configuration additional params
 *
 * @returns block which contains items from one category
 */
const renderCategory = (item: ProductCategoryModelWithProducts, configuration: Configuration): JSX.Element => {
  const { title, products } = item;
  const cards: ProductCardModel[] = products
    ? products.map<ProductCardModel>((value) => {
        if (!value) {
          // eslint-disable-next-line no-console
          console.error('undefined product cart value!', item);
          return {
            id: 0,
            thumbnail: '',
            title: 'Error cart',
            units: configuration.quantityError,
            price: configuration.priceError
          };
        }

        let imageUrl = '';
        if (!value.imageUrls) {
          // eslint-disable-next-line no-console
          console.error('undefined imageUrls', value);
          imageUrl = '';
        } else {
          imageUrl = value.imageUrls[0];
        }

        return {
          id: value.id,
          thumbnail: imageUrl,
          title: ProductUtils.cleanTitle(value.name),
          units: ProductUtils.makeSimpleQuantityString(value.price.properties, configuration.quantityError),
          price: ProductUtils.makeMinPriceString(
            value.price.properties,
            configuration.currency,
            configuration.priceError
          )
        };
      })
    : [];
  return <CardsSection title={title} cards={cards} />;
};
