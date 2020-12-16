function show() {
    let view = document.getElementById("view");
    let urls = "http://localhost:8080/GUDANG/webresources/gudang.barang";


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

                view.innerHTML = id + " - " + namabarang + " - " + jumlah;

            }
            else (view.innerHTML = "Data tidak ada")

        },
        fail: function (e) { allert("error"); }

    })

}


function findforedit() {
    let idn = document.getElementById("ibd").value;
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
                document.getElementById("nibd").value = id;
                document.getElementById("nnamabarang").value = namabarang;
                document.getElementById("njumlah").value = jumlah;



            }
            else (view.innerHTML = "Data tidak ada")

        },
        fail: function (e) { allert("error"); }

    })

}

function updatedata() {
    let view = document.getElementById('data');
    let idobj = document.getElementById('inputid');
    let ibd = idobj.elements[0].value;
    let namas = idobj.elements[1].value;
    let jumlahs = idobj.elements[2].value;
    let url = 'http://localhost:8080/GUDANG/webresources/gudang.barang/';
    let passvar =
        '<barang>' +
        '<ibd>' + ibd + '</ibd>' +
        '<namabarang>' + namas + '</namabarang>' +
        '<jumlah>' + jumlahs + '</jumlah>' +
        '</barang>';
    url += ibd;
    $.ajax({
        url: url,
        method: 'PUT',
        contentType: 'application/xml',
        data: passvar,
        success: function (resp) {
            view.innerHTML = 'id: ' + ibd + ' updated';
        },
        fail: function (e) {
            view.innerHTML = 'update failed';
        }
    })

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

function createdata() {
    let urls = "http://localhost:8080/GUDANG/webresources/gudang.barang";
    let view = document.getElementById('add');
    let idinput = document.getElementById('inputid');
    let ibd = idinput.elements[0].value;
    let nama = idinput.elements[1].value;
    let jumlah = idinput.elements[2].value;
    let xml =
        '<barang>' +
        '<ibd>' + ibd + '</ibd>' +
        '<namabarang>' + nama + '</namabarang>' +
        '<jumlah>' + jumlah + '</jumlah>' +
        '</barang>';

    $.ajax({
        url: urls,
        method: 'POST',
        contentType: 'application/xml',
        data: xml,
        success: function (resp) {
            view.innerHTML = '1 baris dengan id  ' + ibd + ' sudah ditambahkan';
        },
        fail: function (e) {
            view.innerHTML = 'Data gagal disimpan';
        }
    })
}

