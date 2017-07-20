三级联动样式
===============

## 使用说明
config{

    "data": [],
    
    "inputID":'catID',
    
    "htmlID":'category',
    
    "firstID":'sort-list-first',
    
    "secondID":'sort-list-second',
    
    "thirdID":'sort-list-third',
    
    "tmp":'<span title="#title" data-id="#id">#title</span>',
    
    "childName":'span',
    
    "title":'#title',
    
    "id":'#id',
    
    "selectClass":'active'
}

var data=[{"id":11,"name":22,"child":[]},{"id":11,"name":22,"child":[]}]

$.menu.setData(data);

$.menu.first();
