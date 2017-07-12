/* global _ */

$(document).ready(function() { //when document is ready, this function will be executed, this is our callback function

    var products = window.products();

//1 createListProduct
        function createListProduct(products) {
            var $ul = $('<ul>')
                .attr('id', 'productlist')
                .attr('class', 'flex-container')
                .css('list-style', 'none') //hide the bullet items
                .append(_.map(products, function(product, index) {
                    return $('<li>').attr('name', product['id']).attr('class', "flex-item").attr('id', product['price']).css('color', 'coral').css("font-family", 'Prociono').css('font-weight', 'bold').css('font-size', '15px')
                        .append($('<img src= /' + product['image'] + ' class="img-thumbnail">')).append($('<br>'))
                        .append(product.desc)
                        .append(" ,$")
                        .append(product.price)
                }));
            return $ul;
        }

        createListProduct(products).appendTo('body');
        console.dir($(".flex-item").first())


        //var arrayType = _.uniq(_.pluck(products, 'type'));
        var arrayType = _.uniq(_.map(products, 'type'));

//2 dropdown box phone case
        $('<form>').prependTo('body')
            .attr('id', 'form1').css("color", "DeepPink").css("font-family", "Shrikhand").append("Filter By:");
        $('<select>').attr('name', 'select').attr('id', 'select1').attr('class', 'form-control').css("width", "280px").css("color", "DeepPink").appendTo('#form1')
        var Alltypes = _.map(arrayType, function(value) {
            return $('<option class=' + value + '>').append(value); // .phone === class = 'phone'
        });
        $('select').append(Alltypes);



//3 display all phones or all cases
//on clicking on select get the function moving
/**This method is a shortcut for .on( "change", handler )
The change event is sent to an element when its value changes.
This event is limited to <input> elements, <textarea> boxes and <select> elements. **/
        $("#select1").change(function() {
            var abc = $(this).val();
            _.each(products, function(product) {
                if (abc === product.type) {
                    $('li[name = ' + product.id + ']').show(); //Selecting Elements by Attributes $( "input[name='first_name']" );wanted to select li[0]
                }
                else {
                    $('li[name = ' + product.id + ']').hide();
                }
            });
        })

//4 dropdown box prices
        $('<form>').appendTo('#form1')
            .attr('id', 'form2').css("color", "DeepPink").css("font-family", "Shrikhand").append("Sort by Price:");
        $('<select>').attr('name', 'select').attr('id', 'select2').attr('class', 'form-control').css("width", "280px").css("color", "DeepPink").appendTo('#form2');
        $('<option class="asc">').append("By Ascending order").appendTo('#select2');
        $('<option class="desc">').append("By Descending order").appendTo('#select2');

//5 sorting function

/**var items = [
  { name: 'Edward', value: 21 },
  { name: 'Sharpe', value: 37 },
  { name: 'And', value: 45 },
  { name: 'The', value: -12 },
  { name: 'Magnetic' },
  { name: 'Zeros', value: 37 }
];

// sort by value
items.sort(function (a, b) {
  if (a.value > b.value) {
    return 1;
  }
  if (a.value < b.value) {
    return -1;
  }
  // a must be equal to b
  return 0;
});
**/
        function sortMeBy(sel, elem, order) {
            var $selector = $(sel),
                $element = $selector.children(elem);

            $element.sort(function(a, b) {
                var an = parseInt(a.getAttribute("id")),
                    bn = parseInt(b.getAttribute("id"));

                if (order == 'asc') {
                    if (an > bn)
                        return 1;
                    if (an < bn)
                        return -1;
                }
                else if (order == 'desc') {
                    if (an < bn)
                        return 1;
                    if (an > bn)
                        return -1;
                }
                return 0;
            });

            $element.detach().appendTo($selector);
        }

//6 sort by price function and html linked
        $("#select2").change(function() {
            var selection = $(this).val();
            if (selection === "By Ascending order") {
                sortMeBy('#productlist', 'li', 'asc');
            }
            else {
                sortMeBy('#productlist', 'li', 'desc');
            }
        });

//7 the search box
        $('<form>').prependTo('body')
            .attr('id', 'form3').attr('class', 'form-inline pull-xs-right').css("font-family", "Lobster")
        $('<input>').attr('type', 'text').attr('class', 'form-control').attr('placeholder', 'Search ...').attr('id', 'input1').appendTo('#form3');
        $('<button>').append('Search').attr('id', 'button1').attr('class', 'btn btn-success-outline').attr('type', 'submit').appendTo('#form3');

//8 the search box with function
        $('#button1').click(function(e) {
            e.preventDefault();
            var myValue = $('#input1').val();
            var search1 = search(products, myValue);
            var search2 = _.map(search1, 'id');
            _.each(products, function(product) {
                if (search2.indexOf(product.id) > -1) {
                    $('li[name = ' + product.id + ']').show()
                }
                else {
                    $('li[name = ' + product.id + ']').hide();
                }
            });
        })

//9 the search function

        function search(collection, target) { // === [Objects]
            var output = [];
            _.each(collection, function(value) {
                if (isCollection(value)) {
                    if (search(value, target).length) {
                        output.push(value);
                    }
                }
                else if (typeof value === 'string') {
                    if (value.toLowerCase().indexOf(target.toLowerCase()) > -1) {
                        output.push(value);
                    }
                }
            });
            return output;
        }

        function isCollection(value) {
            if (value !== null && value instanceof Date === false && typeof value === 'object') return true;
            return false;
        }
        console.log(search(products, 'Super slim design'));

//10 the navbar
        $("<nav>").attr("class", "navbar navbar-dark").attr("id", "nav").addClass("bb").css("background-color", "black").css("height", "50px")
            .text("Product Project").css("color", "white").css("font-family", "Shrikhand").css("font-size", '150%')
            //.html('<a>NavBar</a>').attr("class","navbar-brand")
            .prependTo("body");

//11 the glyphicon that requires a special library
        //$("<p>").text("Contact Us").css("color","DeepPink").css("font-family","Shrikhand").html("<span>").attr("class","glyphicon glyphicon-envelope").appendTo("body");
        $("<p>").attr("id", "pp").text("Contact Us").css("color", "DeepPink").css("font-family", "Shrikhand").appendTo("body");
        $("#pp").append("<p><span class='glyphicon glyphicon-envelope'></span></p>");

//12 the lightox structure
        $(" <div>").attr("class", "modal").attr("id", "myModal").appendTo("body")
        $(" <div>").attr("class", "modal-dialog").appendTo("#myModal");
        $(" <div>").attr("class", "modal-content").appendTo("#myModal");
        $(" <div>").attr("class", "modal-header").appendTo(".modal-content");
        //$("<p><span class='close'>&times</span></p>").appendTo(".modal-header");
        //$('<img src= img/product/thumbs/galaxy6-gold.jpg>').appendTo(".modal-header");
        $(" <div>").attr("class", "modal-footer").appendTo(".modal-content");
        $(" <button type='button' class='btn btn-default' data-dismiss='modal'>Close</button>").attr("id", "bb").appendTo(".modal-content")

//13 the lightbox function
        $(".flex-item").click(function(product) {
            var abc1 = $(this).html();
            $(".modal-header").html(abc1);
            $(".modal").show();
        });

//14 the close lightbox function
        $("#bb").click(function() {
            $(".modal").hide();
        });

//15 create the lightbox inside the fucntion, closing it inside the function, and have to clik 2 times to create lightbox
// $(".flex-item").click(function(product) {

//             var abc1 = $(this).html();
//           // var abc2 = $(this).getAttribute("src")
//              if ($('.modal').length > 0) { // #lightbox exists
//                     //place href as img src value
//                     $('.modal-content').html(abc1);
//                     //show lightbox window - you could use .show('fast') for a transition
//                     $('.modal').show();
//                 }
//                 else { //#lightbox does not exist - create and insert (runs 1st time only)
//                     //create HTML markup for lightbox window
//                     var lightbox =
//                         '<div class="modal">' +
//                         '<p>Click to close</p>' +
//                         '<div class="modal-content">' + //insert clicked link's href into img src
//                         '</div>' +
//                         '</div>';
//                     //insert lightbox HTML into page
//                     $('body').append(lightbox);
//                 }
//                   $('.modal').on('click', function() { //1. Uses the not deprecated demand to bind the click function
//                                                           //2. Binds the click function to the lightbox div after it's created
//                 $('.modal').hide();
//             });
//             });

//16 OP notes and bower component
$("<div>").attr("id","container").addClass("container").prependTo("body")
 $(function () {
                window.opspark.notes.hide();
     });




});
