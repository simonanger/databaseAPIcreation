var renderList = function (countries) {
  var bucket = document.getElementById('bucket')

  // This is grubby:
  bucket.innerHTML = ''

  var list = document.getElementById('bucket')

  countries.forEach(function (country) {
    var listItem = document.createElement('li')

    listItem.innerText = country.name

    list.appendChild(listItem)
  })


  bucket.appendChild(list)
}

module.exports = renderList
