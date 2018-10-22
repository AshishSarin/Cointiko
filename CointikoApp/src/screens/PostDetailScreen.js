import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Dimensions, Text, Image, WebView } from 'react-native';
import { connect } from 'react-redux';
import HTML from 'react-native-render-html';
import HTMLView from 'react-native-htmlview';


class PostDetailScreen extends Component {


    constructor(props) {
        super(props);
        const { navigation } = this.props;
        const postId = navigation.getParam('id', 0);

        let data = this.props.postList.find(post => post.id === postId);



        this.state = {
            postData: data
        }

        // console.warn(postData);

    }

    render() {
        var htmlContent = this.state.postData.content.rendered;

        // var htmlContent = '<h1 style=\"text-align: Justify;\">Bitcoin price news</h1>\n<p style=\"text-align: Justify;\">Since it first came on the scene Bitcoin price performance has been steadily increasing. The <strong>bitcoin market price</strong> has been fairly calm in the global trades. This creates a peaceful atmosphere in areas of cryptocurrencies. Bitcoin has been one of the only currencies that have to remain stable while the exchange value is at its worst in over a dozen months. October is a month that social media has noted that there will not be much impact to bitcoin prices right now due to <a href=\"https://cointelegraph.com/news/bitcoin-altcoin-prices-shun-volatility-amid-multi-year-trade-volume-lows\"><strong>bitcoin price news</strong></a>.</p>\n<h2 style=\"text-align: Justify;\"><strong>Low volumes for trading</strong></h2>\n<p style=\"text-align: Justify;\"><strong>Bitcoin today price</strong> has remained stable as that of Altcoin has fluctuated. It is a belief that the trading has been a bit slow and has been so for the past couple of years. Most bitcoin investors are reluctant to make any moves on the market. This is a treasure cove for traders as the volumes are as low as they were a year ago. This has been seen before. It is a pattern that influences the <strong>bitcoin price prediction</strong>. It is still very apparent that it is poised to take the market.</p>\n<p style=\"text-align: Justify;\"><strong>Poised for an increase</strong></p>\n<p style=\"text-align: Justify;\"><a href=\"https://www.cointiko.com/bitcoin-news/factors-affecting-bitcoin-price-right-now/\"><strong>Bitcoin price right now</strong></a> is in a position that has been seen before and the end result was a breakout for the currency. Experts believe that a breakout of above two hundred DMA could be the direction of bitcoin. It is a very good time to invest or buy bitcoin. The patterns it has been showing in the market leads experts to believe there is a dramatic change or increase on the horizon. It could be for this very same reason bitcoin has not show much volatility and it might just be the calm before the storm.</p>\n<p style=\"text-align: Justify;\">The <strong>current btc price</strong> is expected to remain more or less in the same position. It is expected that this pattern will go well in the fourth quarter before any real change is seen in the pattern. If you are considering buy bitcoins this might be the best time to do so. The currency made a breakout in mid-September but was never able to surpass the three <strong>billion mark</strong>. If and when the currency reaches this mark the market will have seen its best and its absolute worst. It is still an only md year and there is time for the market to change but that might be asking for too much. There will be a change in the currency’s pattern on the market between now and the end of the fourth quarter.</p>\n<p style=\"text-align: Justify;\"> <strong>If you want to know more about crypto information click – <a href=\"https://www.cointiko.com/bitcoin-news/who-regulates-the-price-of-bitcoin/\">bitcoin price prediction</a> | <a href=\"https://www.cointiko.com/bitcoin-news/crypto-industry-bitcoin-latest-news-today/\">bitcoin news now</a></strong></p>\n';
       
    
        // var htmlContent = '<p><img class=\"aligncenter size-full wp-image-1380\" title=\"High Performance Blockchain\" src=\"https://www.cointiko.com/wp-content/uploads/2018/10/high-performance-blockchain-1.jpg\" alt=\"High Performance Blockchain\" width=\"768\" height=\"445\" srcset=\"https://www.cointiko.com/wp-content/uploads/2018/10/high-performance-blockchain-1.jpg 768w, https://www.cointiko.com/wp-content/uploads/2018/10/high-performance-blockchain-1-300x174.jpg 300w\" sizes=\"(max-width: 768px) 100vw, 768px\" /></p><img class=\"aligncenter size-full wp-image-1380\" title=\"High Performance Blockchain\" src=\"https://www.cointiko.com/wp-content/uploads/2018/10/high-performance-blockchain-1.jpg\" alt=\"High Performance Blockchain\" width=\"768\" height=\"445\" srcset=\"https://www.cointiko.com/wp-content/uploads/2018/10/high-performance-blockchain-1.jpg 768w, https://www.cointiko.com/wp-content/uploads/2018/10/high-performance-blockchain-1-300x174.jpg 300w\" sizes=\"(max-width: 768px) 100vw, 768px\" />\n<p style=\"text-align: Justify;\">It can be a very scary thing to invest in stock, but it can also be one of the most exciting investments to make. It is very important that you remember to choose only the best broker to assist you. Here are many brokers available but you should try to get involved with the one that you believe is suitable for your needs. Cryptocurrencies are the most well-known application. <a href=\"https://cointelegraph.com/news/time-magazine-includes-blockchain-startup-in-its-50-genius-companies-2018-list\"><strong>Blockchain technology</strong></a> is able to retain large amounts of data. The data is secured and encrypted in a way that each transaction that is made cannot be tampered with or altered in any way shape or form.</p>\n<p style=\"text-align: Justify;\"><strong>Blockchain tech</strong></p>\n<p style=\"text-align: Justify;\">This is a new technology that is considered as one of a few incredible companies and there are many people out there that have no idea <strong>how to invest the blockchain</strong>. There are several ways to invest in the blockchain. There are some risky methods and there are some safe methods. The riskiest way is by making investments in cryptocurrency. The currency might not be blockchain directly but this may be the most direct way to invest in the <a href=\"https://www.cointiko.com/blockchain-technology/basics-of-blockchain-technology-what-is-blockchain-technology/\"><strong>blockchain technology stock</strong></a>. Investing in entities that are exploiting the tech is also a very risky way of investing. These may be high-performance blockchain and some of the best blockchain technology stocks but investing can be risky.</p>\n<p style=\"text-align: Justify;\"><strong>Invest without risks</strong></p>\n<p style=\"text-align: Justify;\">There are ways to invest that are not so risky. You could choose to invest in the blockchain ETFs that are traded publicly. This type of investment is similar to an everyday investment. These ETFs do not trade in cryptocurrency, so the risk of investment is minimal. If you have the time and want to invest in the tech with the least risk, you will have to learn the <strong>blockchain development</strong>. This blockchain tech is a paradigm shifter. It’s possible that this tech could significantly impact the way we communicate similarly to the internet and cell phones. It has the capability of sending and receiving valuable data between two computers with fewer possibilities of theft and inefficiency.</p>\n<p style=\"text-align: left;\">This company and its tech might redefine many of the ways we communicate and, in some instances, send and receive valuable data. If you are not investing in blockchain you need to. There are many ways and you won’t have to take a lot of risks to invest There are some risky investment ways but there are other ways of investing that are not so risky, and this may include <a href=\"https://www.cointiko.com/blockchain-technology/world-banks-blockchain-penny-stocks/\"><strong>blockchain penny stocks</strong></a>.</p>\n<p style=\"text-align: Justify;\"><strong>If you want to know more about crypto information click – <a href=\"https://www.cointiko.com/bitcoin-news/what-happened-when-secret-bitcoin-key-went-public/\">bitcoin latest news today</a> | <a href=\"https://www.cointiko.com/bitcoin-mining/best-bitcoin-mining-pools/\">best bitcoin mining pool</a></strong></p>\n'
     var tmp = htmlContent.replace(/<img .*?>/,""); 


    //  var tmp2 = tmp.replace(/<p><[/]p> .*?>/g,""); 

     var tmp2 = tmp.replace("<p></p>",""); 

     tmp2 = tmp2.replace("<h1></h1>",""); 
        console.log(tmp2);

    //  var tmp3 = tmp.replace(/<[/]p .*?>/g,""); 
        console.log(this.state.postData._embedded["wp:featuredmedia"][0].source_url);
        var tempImg = this.state.postData._embedded["wp:featuredmedia"][0].source_url;
        return (
            <ScrollView style={{ flex: 1, paddingHorizontal: 24 }}>
                <Image 
                    style={{width: "100%", height: 200}}
                source={{uri: tempImg}}/>
                <HTMLView
                    value={tmp2}
                    stylesheet={styles}
                />
            </ScrollView>

            // <WebView
            //     originWhitelist={['*']}

            //     source={{ html: htmlContent }}
            //     style={{ marginTop: 20 }}
            // />
        );
    }

}

const styles = StyleSheet.create({

    a: {
        fontWeight: '300',
        color: '#FF3366', // make links coloured pink
    },
});

const mapStateToProps = (state) => {
    const { postList } = state.posts;
    return { postList };
}


export default connect(mapStateToProps, {})(PostDetailScreen)