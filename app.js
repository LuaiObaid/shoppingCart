// make sure that the page is downloading
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}
function ready() {
    const remBtn = document.getElementsByClassName('rem')
    const getItem = document.getElementsByClassName('flex');

    for (let i = 0; i < remBtn.length; i++) {
        const button = remBtn[i];
        //the event also gets a traget obejct
        button.addEventListener('click', function (event) {
            var btnClicked = event.target
            btnClicked.parentElement.remove()
            updateTotal()
        })
      var quantityInput = document.getElementsByClassName('quantity')
      for(let i = 0; i < quantityInput.length; i++)
      {
        var input = quantityInput[i]
        input.addEventListener('change', changeQuantity)
      }
    }
    var addToCart = document.getElementsByClassName('addToCart')
    for (let i = 0; i < addToCart.length; i++) {
        const addElement = addToCart[i];
       addElement.addEventListener('click', addItem)
    }

}

function changeQuantity(event){
   var input = event.target
   if(isNaN(input)||input.value <= 0 )
   {
    input = 1
   }
   updateTotal()
}
function addItem(event){
   var addElement = event.target;
   var dispaly = document.getElementsByClassName('cartItem')
  var shopItem = addElement.parentElement.parentElement;
  var title = shopItem.getElementsByClassName('itemTitle')[0].innerText
  var price =parseFloat(shopItem.getElementsByClassName('cart-price')[0].innerText.replace( 'price','').replace('$',''))
  var img = shopItem.getElementsByClassName('im')[0].src
  console.log(title)
  console.log(price)
  console.log(img)
  addItemToCart(title, price, img)
}

function addItemToCart(title, price, img) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('list-item')
    var cartItem = document.getElementsByClassName('cartItem addNew-item')[0]
    var cartContent = `<div class="flex list-item">
    <div>
        <h2>Item</h2>
        <div>
            <span class="itemTitle">${title}</span>
            <img src="${img}" alt="iphone">
        </div>
    </div>
    <div>
        <h2 class="cart-price">price</h2>
        <div>
            <h4 class="cart-price">${price}$</h4>
        </div>
    </div>
    <div>
        <h2>Quantity</h2>
        <div>
            <input type="number" class="quantity"></input>
        </div>
    </div>

    <button class="rem">remove</button>
</div>`
cartRow.innerHTML = cartContent
    cartItem.append(cartRow)
}
/* can't loop through this
function rem() {
    getItem.remove();
    }*/


// update price
function updateTotal() {
    var total = 0
    var upadateBtn = document.getElementsByClassName('cartItem')[0]
    var cartRows = upadateBtn.getElementsByClassName('list-item')
    for (let i = 0; i < cartRows.length; i++) {
        var element = cartRows[i];
        var priceElement = element.getElementsByClassName('cart-price')[0]
        var quantityElement = element.getElementsByClassName('quantity')[0]
        // console.log(priceElement, quantity)
        var price = parseFloat(priceElement.innerText.replace("$", ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
        console.log(total)
    }
    // round it to decimail numbers
    total = Math.round(total*100)/100
    document.getElementsByClassName('total')[0].innerText = 'total price is ' + total

}
