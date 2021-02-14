import React, { useEffect, useState } from 'react';
import { Carousel } from 'antd';
import { Card, ProductInfo, Image } from './styles'

export default function ProductCard({product}) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    setImages([]);
        
  }, []);

  useEffect(() => {
    if(product && product.images) setImages(product.images)
  }, [product])

  return (
    <Card>
      <Carousel
        autoplay
      >
        {images.map((img) => {return <Image key={img._id} src={img.url}/>})}
      </Carousel>
      
      <ProductInfo>
        <span id="name">{product.name}</span>
        <span id="value">{product.value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL', minimumFractionDigits: 2})}</span>
        <span id="description">{product.description}</span>
      </ProductInfo>
    </Card>
  )
}
