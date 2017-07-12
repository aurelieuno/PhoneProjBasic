/* global _ */

$(document).ready(function() { //when document is ready, this function will be executed, this is our callback function

  $('<form>').prependTo('body')
            .attr('id', 'form3').attr('class', 'form-inline pull-xs-right').css("font-family", "Lobster")
        $('<input>').attr('type', 'text').attr('class', 'form-control').attr('placeholder', 'Search ...').attr('id', 'input1').appendTo('#form3');
        $('<button>').append('Search').attr('id', 'button1').attr('class', 'btn btn-success-outline').attr('type', 'submit').appendTo('#form3');

 $('#button').click(function(e) {
    e.preventDefault();
            var name = $('#name').val();
            alert(name+"has submitted")
            });

 (function() {
var products = ["hello", "joie", "mignon","life"];
return products;
})()








});
