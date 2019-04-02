container = $('#container')

function changeState(type) {
  const selectors = `span[data-diff-op="${type}"] span.old, span[data-diff-op="${type}"] span.new`
  container.find(selectors).toggleClass('muted plain')
}

function muteAllStructural() {
  const selectors = `span[data-diff-type="structural"]>span`

  container.find(selectors).addClass('muted')

}

function unmuteAllStructural() {
  const selectors = `span[data-diff-type="structural"]>span`
  container.find(selectors).removeClass('muted')
}

function muteAllSemantic() {
  container.find('span[data-diff-type="semantic"]>span>span').addClass('muted plain')
}

function unmuteAllSemantic() {
  const selectors = `span[data-diff-type="semantic"]>span>span`
  container.find(selectors).removeClass('muted')
}

function lightMode() {
  $('nav.navbar').removeClass('navbar-dark bg-dark')
  $('nav.navbar').addClass('navbar-light bg-light')

  $('.btn-dark').removeClass('invisible')
  $('.btn-light').addClass('invisible')

  $('body').removeClass('dark')
  $('#container').removeClass('dark')

  $('div#sidebar-wrapper').removeClass('bg-dark')
  $('div#sidebar-wrapper').addClass('bg-light')

  $('a.list-group-item').removeClass('bg-dark')
  $('a.list-group-item').addClass('bg-light')
}

function darkMode() {
  $('nav.navbar').removeClass('navbar-light bg-light')
  $('na.navbar').addClass('navbar-dark bg-dark')

  $('.btn-dark').addClass('invisible')
  $('.btn-light').removeClass('invisible')

  $('body').addClass('dark')
  $('#container').addClass('dark')

  $('div#sidebar-wrapper').addClass('bg-dark')
  $('div#sidebar-wrapper').removeClass('bg-light')

  $('a.list-group-item').addClass('bg-dark')
  $('a.list-group-item').removeClass('bg-light')
}

function loadStructuralCSS() {
  $('#semanticCSS').remove()
  $('head').append('<link id="structuralCSS" rel="stylesheet" href="css/structural.css" type="text/css" />')
}

function loadSemanticCSS() {
  $('#structuralCSS').remove()
  $('head').append('<link id="semanticCSS" rel="stylesheet" href="css/semantic.css" type="text/css" />')
}

$(document).ready(function () {

  loadSemanticCSS()

  lightMode()

  $('[href="#collapseStructural"]').on('click', function () {
    $(this).find('i.fa-caret-down').toggleClass('invisible')
    $(this).find('i.fa-caret-right').toggleClass('invisible')
  })

  $('.btn-dark').on('click', function () {
    darkMode()
  })

  $('.btn-light').on('click', function () {
    lightMode()
  })

  $('#changeStateStructural').on('change', function () {

    let state = $(this).prop('checked')
    $('#collapseStructural').find('input').prop('checked', state)

      !state ? muteAllStructural() : unmuteAllStructural()
  })

  $('#changeStateSemantic').on('change', function () {

    let state = $(this).prop('checked')
    $('#collapseSemantic').find('input').prop('checked', state)

      !state ? muteAllSemantic() : unmuteAllSemantic()
  })

  /*
  $('button[href="#collapseStructural"]').on('click', function () {
    loadStructuralCSS()
    $('#collapseSemantic').collapse('hide')
  })

  $('button[href="#collapseSemantic"]').on('click', function () {
    loadSemanticCSS()
    $('#collapseStructural').collapse('hide')
  })
  */
})

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})