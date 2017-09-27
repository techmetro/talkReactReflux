import React from 'react';
import Reflux from 'reflux';
import Actions from '../Actions';
import Article from './Article';
import ArticleStore from '../stores/ArticleStore';
import BasketStore from '../stores/BasketStore';
import _ from 'lodash';
import './ExampleWebshop.scss';

class ExampleWebshop extends Reflux.Component {

    constructor(props) {
        super(props);
        this.stores = [ArticleStore, BasketStore];
    }

    componentDidMount() {
        Actions.loadArticles();
    }

    renderHeader() {
        return (
            <div className="row webshop-header">
                <img className="logo" src="https://www.metroag.de/~/assets/metro/images/logo/metro-logo-full-white.svg" />
                <div className="basket" onClick={() => Actions.clearBasket()}>
                    <span>{this.state.sumPrice + "€"}</span>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.renderHeader()}
                <div className="row mt-3">
                    {this.state.articles.map(article =>
                        <Article key={"article" + article.id}
                                 article={article}
                                 articleIsNotInBasket={!_.some(this.state.basket, { "id": article.id })}
                        />
                    )}
                </div>
            </div>
        );
    }
}

export default ExampleWebshop