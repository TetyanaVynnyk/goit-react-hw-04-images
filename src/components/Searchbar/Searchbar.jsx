import { Component } from "react";

import Modal from "./Modal";
import Button from "./Button";
import Spinner from "./Loader";

import SearchForm from "./Searchform";
import ImageGallery from "./ImageGallery";
import BigImage from "./ImageGallery/BigImage";

import { searchImages } from "shared/services/images-api";

import styles from "./searchbar.module.css";

class Searchbar extends Component {
    state = {
        search: "",
        items: [],
        loading: false,
        error: null,
        page: 1,
        totalHits: 0,
        showModal: false,
        bigImg:null,
        }

    componentDidUpdate(prevProps, prevState) {
        const {search, page} = this.state;
        if (search.trim() === '') {
            return alert `You have not entered a request`}

        if(prevState.search !== search || prevState.page !== page) {
            this.fetchImages();
        }
    }

    async fetchImages() {
        try {
            this.setState({loading: true});
            const {search, page} = this.state;
            const data = await searchImages(search, page);
            const { hits, totalHits } = data;
            this.setState(({items}) => ({
                items: [...items, ...hits], totalHits,
            }))
            
        }
        catch(error) {
            this.setState({error: error.message})
        }
        finally {
            this.setState({loading: false})
        }
    }

    searchImages = ({search})=> {
        this.setState({search, items: [], page: 1});
    }

    loadMore = ()=> {
        this.setState(({page}) => ({page: page + 1}))
    }

    showBigImage = ({largeImageURL, tags}) => {
        this.setState({
            bigImg : {largeImageURL, tags},
            showModal: true,
        })
    }

    closeModal = ()=> {
        this.setState({
            showModal: false,
            bigImg: null,
        })
    }

    render() {
        
        const { items, loading, error, search, totalHits, showModal, bigImg } = this.state;
        const {searchImages, loadMore, showBigImage, closeModal} = this;
        
        return (
            <>
            <SearchForm onSubmit={searchImages}/>
                <ImageGallery items={items} showImages={showBigImage}/>
                {!items.length && search && !loading &&<p className={styles.message}>Oops... Images not found</p>}
                {error && <p>{error}</p>}
                {loading && <Spinner/>}
                {Boolean(items.length)&& items.length < totalHits && <Button loadMore={loadMore}>Load more</Button>}
                {showModal && <Modal close={closeModal}><BigImage {...bigImg}/></Modal>}
            </>
        )
    }
}

export default Searchbar;