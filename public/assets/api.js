$(document).ready(function(){

    $('form').on('submit', function(){
        let item = $('.myInput');
        let todo = {item: item.val()};

        $.ajax({
            type: 'POST',
            url: '/todo',
            data: todo,
            success: function(data){
                location.reload();
            }
        });

        return false;

    });

    $('li').on('click', function(){
        let item = $(this).text().replace(/ /g, "-");
        $.ajax({
            type: 'DELETE',
            url: '/todo/' + item,
            success: function(data){
                location.reload();
            }
        });
    });
});