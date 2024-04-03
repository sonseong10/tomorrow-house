import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {Text} from '../../styles/components';
import SVG from '../../commons/styles/svgIcon';

interface IProductListProps {
  products?: Array<{
    code: string;
    imageURL: string;
    price: number;
    discount?: number;
    supplierName: string;
    reviewCount?: number;
    name: string;
    grade: number;
  }>;
}

const ProductCardList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin-top: 12px;

  li {
    padding: 0 10px 30px 10px;
    flex: 0 0 25%;

    img {
      display: block;
      width: 100%;
      object-fit: cover;
      border-radius: 4px;
    }

    h4 {
      font-size: 1rem;
    }

    i {
      display: inline-block;
      width: 12px;
      height: 12px;
      background: url(${SVG.Star('#35C5F0')}) no-repeat center center;
    }
  }
`;

export function ProductList({products}: IProductListProps) {
  return (
    <ProductCardList>
      {products?.map((product) => (
        <li key={product.code}>
          <Link to={'/store'}>
            <div>
              <img src={product.imageURL} alt={product.name} />
            </div>
            <div>
              <Text size="sm">{product.supplierName}</Text>
              <h4>{product.name}</h4>
              <div>
                {product.discount ? <em>{product.discount}%</em> : <></>}
                <strong>{product.price.toLocaleString()}</strong>
              </div>
              <div>
                <i></i>
                <strong>{product.grade}</strong>
                <span>리뷰 {product.reviewCount?.toLocaleString()}</span>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ProductCardList>
  );
}
