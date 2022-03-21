import React, { useMemo, useEffect, useState } from 'react'
import { Link, useLocation, useParams, useHistory } from 'react-router-dom'
import { emphasize, styled } from '@mui/material/styles'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Chip from '@mui/material/Chip'
import HomeIcon from '@mui/icons-material/Home'
import productApi from 'api/productApi'
import adminApi from 'api/adminApi'

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === 'light'
      ? theme.palette.grey[100]
      : theme.palette.grey[800]
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  }
}) // TypeScript only: need a type cast here because https://github.com/Microsoft/TypeScript/issues/26591

export default function Breadcrumb(props) {
  const history = useHistory()
  const location = useLocation()
  const { id } = useParams()
  const [product, setProduct] = useState({})
  const [account, setAccount] = useState({})

  const getProductById = async (id) => {
    try {
      const res = await productApi.getProductById(id)
      setProduct(res.product)
    } catch (err) {}
  }
  const getAccountByID = async (id) => {
    try {
      const res = await adminApi.getInfoById(id)
      setAccount(res)
    } catch (err) {}
  }
  useEffect(() => {
    if (id) {
      if (objParams[0] === 'admin') {
        if (objParams[1] === 'accounts') {
          getAccountByID(id)
          return
        }
        if (objParams[1] === 'products') {
          getProductById(id)

          return
        }
        if (objParams[1] === 'categories') {
          return
        }
      } else if (objParams[0] === 'products') {
        getProductById(id)
        return
      }
      getProductById(id)
      return
    }
  }, [location.pathname, id])

  const objParams = useMemo(() => {
    const arrParams = location.pathname.split('/').filter((x) => x)

    return arrParams
  }, [location.pathname])

  function handleRedirectTo(url) {
    history.push(`${url}`)
  }

  return (
    <div className='breadcrum-container'>
      <div role='presentation'>
        <Breadcrumbs aria-label='breadcrumb' separator='›'>
          <Link to='/'>
            <StyledBreadcrumb
              label='Home'
              icon={<HomeIcon fontSize='small' />}
            />
          </Link>
          {objParams.map((pathname, index) => {
            const last = index === objParams.length - 1
            const to = `/${objParams.slice(0, index + 1).join('/')}`

            return last ? (
              <Link to={`/${to}`} key={to}>
                <StyledBreadcrumb
                  label={
                    breadcrumbNameMap[to]
                      ? breadcrumbNameMap[to]
                      : account
                      ? account.email || product.title
                      : id
                  }
                  key={to}
                  sx={{ backgroundColor: '#ddd' }}
                />
              </Link>
            ) : (
              <Link to={`${to}`} key={to}>
                <StyledBreadcrumb
                  // component='a'
                  // href={to}
                  label={breadcrumbNameMap[to]}
                  key={to}
                />
              </Link>
            )
          })}
        </Breadcrumbs>
      </div>
    </div>
  )
}
const breadcrumbNameMap = {
  //user
  '/products': 'Products',
  '/products/*': 'Detail',
  '/cart': 'Cart Shopping',
  '': 'Home',
  '/account/infor': 'Profile',
  '/account': 'Account',
  '/account/order': 'Orders',
  //admin
  '/admin': 'Admin Management',
  '/admin/accounts': 'List Acccounts',
  '/admin/products': 'List Products',
  '/admin/categories': 'List Categories',
  '/admin/orders': 'List Orders',
}
