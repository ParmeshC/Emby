﻿(function ($, document) {

    function reloadPlaylist(page) {
        
        var html = '';

        html += '<table class="detailTable">';

        html += '<tr>';
        html += '<th></th>';
        html += '<th>Name</th>';
        html += '<th>Album</th>';
        html += '<th>Time</th>';
        html += '<th>Rating</th>';
        html += '</tr>';

        $.each(MediaPlayer.playlist, function (i, item) {

            var name = LibraryBrowser.getPosterViewDisplayName(item);

            var parentName = item.SeriesName || item.Album || item.ProductionYear || '';

            html += '<tr>';
            html += '<td><a href="#" data-index="' + i + '" class="lnkPlay"><img src="css/images/media/playCircle.png" style="height: 24px;" /></a></td>';
            html += '<td>' + name + '</td>';
            html += '<td>' + parentName + '</td>';
            html += '<td>' + ticks_to_human(item.RunTimeTicks) + '</td>';
            html += '<td>' + LibraryBrowser.getUserDataIconsHtml(item) + '</td>';
            html += '<td><a href="#" data-index="' + i + '" class="lnkRemove"><img src="css/images/media/playCircle.png" style="height: 24px;" /></a></td>';
            html += '</tr>';
        });

        html += '</table>';

        $("#playlist", page).html(html).trigger('create');
    }
    
    $(document).on('pageinit', "#playlistPage", function () {

        var page = this;

        $(page).on('click', '.lnkPlay', function () {

            var index = parseInt(this.getAttribute('data-index'));

            MediaPlayer.currentPlaylistIndex(index);

        }).on('click', '.lnkRemove', function () {

            var index = parseInt(this.getAttribute('data-index'));

            MediaPlayer.removeFromPlaylist(index);
            reloadPlaylist(page);
        });

    }).on('pagebeforeshow', "#playlistPage", function () {

        var page = this;

        reloadPlaylist(page);
    });


})(jQuery, document);