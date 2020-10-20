import React, { PureComponent } from 'react';
import { View } from 'react-native';

import { containerStyle, default as ProductCardTheme } from 'rns-theme/src/theme/components/ProductCard';
import { CacheableImage } from 'components/src/trivial/CacheableImage';
import { PlainText } from 'components/src/trivial/text/PlainText';
import { AppContext } from 'components/src/context';
import { SView } from 'components/src/shared';

interface ProductCardProps {
  thumbnail: string;
  title: string;
  weight: number;
  price: string;
}

export class ProductCard extends PureComponent<ProductCardProps> {
  public render(): JSX.Element {
    const { thumbnail, title, weight, price } = this.props;
    return (
      <SView rnCSS={containerStyle}>
        <AppContext.Consumer>
          {({ imageCacherInterface }): JSX.Element => (
            <CacheableImage style={ProductCardTheme.image} src={thumbnail} imageCacheHoc={imageCacherInterface} />
          )}
        </AppContext.Consumer>
        <View style={{ height: 50, flex: 1, flexDirection: 'column' }}>
          <View>
            <PlainText style={ProductCardTheme.title} wrapLines={2}>
              {title}
            </PlainText>
          </View>
          <View>
            <View style={{ flex: 1, marginTop: 3 }}>
              <PlainText style={ProductCardTheme.weight}>{weight} КГ</PlainText>
            </View>
            <View>
              <PlainText style={ProductCardTheme.price}>RUB {price}</PlainText>
            </View>
          </View>
        </View>
      </SView>
    );
  }
}
