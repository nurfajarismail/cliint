function show() {
    let view = document.getElementById("view");
    let urls = "http://localhost:8080/GUDANG/webresources/gudang.barang";
    view.innerHTML = "Show here";

    $.ajax({
        url: urls,
        method: "GET",
        success: function (xml) {
            let table = xml2html(xml);
            view.innerHTML = table;
        },
        fail: function (e) { allert("error"); }

    })
}


function xml2html(txml) {
    let text = txml.getElementsByTagName('barang');
    let html = '<table border="1">';
    for (row = 0; row < text.length; row++) {
        html += "<tr>" +
            "<td>" + txml.getElementsByTagName('ibd')[row].childNodes[0].nodeValue + "</td>" +
            "<td>" + txml.getElementsByTagName('namabarang')[row].childNodes[0].nodeValue + "</td>" +
            "<td>" + txml.getElementsByTagName('jumlah')[row].childNodes[0].nodeValue + "</td>" +
            "</tr>";
    }
    html += '</table>'
    return html;
}
function findbyid() {
    let view = document.getElementById("findid");
    let idnobj = document.getElementById("inputid");
    let idn = idnobj.elements[0].value;
    let urls = "http://localhost:8080/GUDANG/webresources/gudang.barang";
    let nurl = urls + "/" + idn;
    $.ajax({
        url: nurl,
        method: "GET",
        dataType: "xml",
        success: function (resp) {
            if (resp != null) {
                
                let id = resp.getElementsByTagName('ibd')[0].childNodes[0].nodeValue;
                let namabarang = resp.getElementsByTagName('namabarang')[0].childNodes[0].nodeValue;
                let jumlah = resp.getElementsByTagName('jumlah')[0].childNodes[0].nodeValue;

                view.innerHTML = id + " - " +namabarang+ " - " +jumlah;

            }
            else (view.innerHTML = "Data tidak ada")

        },
        fail: function (e) { allert("error"); }

    })

}
function edit() {
    let view = document.getElementById("view");
    view.innerHTML = "Edit here";
}
function del() {
    let view = document.getElementById("delid");
    let idnobj = document.getElementById("inputid");
    let idn = idnobj.elements[0].value;
    let urls = "http://localhost:8080/GUDANG/webresources/gudang.barang";
    let nurl = urls + "/" + idn;
    $.ajax({
        url: nurl,
        method: "DELETE",
        dataType: "xml",
        success: function (resp) {
            view.innerHTML = 'ID : ' + idn + ' Telah Dihapus';
     

        },
        fail: function (e) { allert("Data tidak ada"); }

    })
}
