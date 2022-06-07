import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({ pages, page, isAdmin = false, atSellerProducts = false, atSellerOrders = false, keyword = '' }) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              isAdmin ? keyword ? `/users/search/${keyword}/users/page/${x + 1}` : `/users/page/${x + 1}`
              : atSellerOrders ? `/orders/page/${x + 1}`
              : keyword ? `/search/${keyword}/restaurants/page/${x + 1}` : `/restaurants/page/${x + 1}`
            }
          >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  )
}

export default Paginate
