'use strict';

(function() {

const TAG_BG_COLORS = {
    task: 'Coral',
    tech: 'SkyBlue',
    dataset: 'LightYellow',
    model: 'MediumSeaGreen',
    tool: 'Gainsboro',
};

function modifyCategories() {
    // 将每个类别输出为对应颜色的标记
    var categories = $('#post-categories').text().split(',');
    var elem = $('#post-categories');
    elem.text('');

    elem.append('<b>分类：</b>');
    for (const cat of categories) {
        var [tag, name] = cat.split('.');
        var bgColor = TAG_BG_COLORS[tag];
        elem.append(`<span style="background-color:${bgColor}">&nbsp;${name}&nbsp;</span> `);
    }
}

$(modifyCategories);

}());
