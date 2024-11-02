import HeadPhones from '../../assets/images/product1.jpg'
import IPHone from '../../assets/images/product2.jpg'
import Product3 from '../../assets/images/product3.jpg'
import Product4 from '../../assets/images/product4.jpg'

const Products = [
    {
        id : 1,
        title : 'I Phone 13 Pro Max',
        price : '900',
        category : 'mobiles',
        description : 'When it comes to cutting-edge technology and iconic design, Apple has always set the bar high. With the [Your iPhone Product Name], were taking innovation to a whole new level. This extraordinary device is a masterpiece of craftsmanship, power, and sophi',
        status : true,
        popStatus : true,
        comments : 5,
        image : IPHone
    },
    {
        id : 2,
        title : 'Introducing the CoolPro X: Redefining Comfort and Cooling',
        price : '50',
        category : 'coolingFans',
        description : 'When the heat is on, and you need instant relief, there is one name you can trust: the CoolPro X, your ultimate cooling fan solution. Designed to keep you cool and comfortable, this',
        status : true,
        popStatus : false,
        comments : 0,
        image : Product3
    },
    {
        id : 3,
        title : 'Elevate Your Gaming Experience with OurGamming Headphones',
        price : '50',
        category : 'headphones',
        description : 'Unleash the full potential of your gaming adventures with our high-performance gaming headphones. At [Your Gaming Headphones Brand], we understand that every click, every step, and every explosion matters in the gaming world. That is why we have crafted the',
        status : true,
        popStatus : false,
        comments : 0,
        image : HeadPhones
    },
    {
        id : 4,
        title : 'K8A Magnatic Cooling Fan For Mobile & Ipad – CM Shope',
        price : '50',
        category : 'coolingFans',
        description : 'The K8A Magnetic Cooling Fan is your ideal companion for keeping your mobile devices, including smartphones and iPads, running smoothly and cool during extended use. This compact and innovative cooling fan attaches effortlessly to your device tha',
        status : true,
        popStatus : false,
        comments : 3,
        image : Product4
    }
]

export default Products;