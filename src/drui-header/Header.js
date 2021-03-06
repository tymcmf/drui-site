import React from 'react'
import PropTypes from 'prop-types'
import { IndexLink, withRouter } from 'react-router'
import styled from 'styled-components'
import { wrapperPadding, activeColor } from '@dr/drui-www/styles/variables'

const activeStyle = { color: activeColor, borderBottom: `2px solid ${activeColor}` }

const HeaderWithStyle = styled.header`
    width: 100%;
    padding: 0 ${wrapperPadding};
    box-sizing: border-box;
    background-color: rgba(255, 255, 255, .7);
    box-shadow: 0 1px 0 0 #eaedf2;
    position: fixed;
    top: 0;
    left: 0;
`

const Wrapper = styled.div`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    display: flex;
    max-width: 1440px;
    margin: 0 auto;
`

const NavWithStyle = styled.nav`
    display: flex;

    a {
        text-decoration: none;
        padding: 1.65rem;
        font-size: 16px;
        color: #666666;
    }
`

class Header extends React.Component {
    constructor(props) {
        super(props)
    }

    navRender() {
        const { nav, params: { cate }, currentPath } = this.props
        return nav.map((n, i) => (
            <IndexLink
                to={n.path}
                key={i}
                style={n.path.indexOf(cate) === 1 ? activeStyle : null}
                onClick={e => {
                    if (currentPath === n.path) {
                        e.preventDefault()
                    }
                }}
            >
                {n.title}
            </IndexLink>
        ))
    }

    render() {
        return (
            <HeaderWithStyle>
                <Wrapper>
                    <div>{this.props.logo}</div>
                    <NavWithStyle>{this.navRender()}</NavWithStyle>
                </Wrapper>
            </HeaderWithStyle>
        )
    }
}

Header.propTypes = {
    logo: PropTypes.element.isRequired,
    nav: PropTypes.arrayOf(PropTypes.shape({
        path: PropTypes.string,
        title: PropTypes.string
    })),
    params: PropTypes.object
}

export default withRouter(Header)

