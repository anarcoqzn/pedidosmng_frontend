import React from 'react';
import { Carousel } from 'antd';
import { Card, ProductInfo, Image } from './styles'

export default function ProductCard({product}) {

  return (
    <Card>
      <Carousel
        autoplay
      >
        {product.images.map((img) => {return <Image key={img._id} src={img.url}/>})}
      </Carousel>
      
      <ProductInfo>
        <span id="name">{product.name}</span>
        <span id="value">{Number(product.value).toLocaleString('pt-br',{style: 'currency', currency: 'BRL', minimumFractionDigits: 2})}</span>
      </ProductInfo>
    </Card>
  )
}
