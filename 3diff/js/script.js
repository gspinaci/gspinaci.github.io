container = $('#container')

const structural_selector = `span[data-diff-type="structural"]`
const semantic_selector = 'span[data-diff-type="semantic"]'
const class_muted = 'muted'

function changeStateStructural(type) {
  $(`span[data-diff-op="${type}"]`).toggleClass(class_muted)
}

function changeStateSemantic(type) {
  $(`span[data-diff-op="${type}"]`).toggleClass(class_muted)
}

function muteAllStructural() {
  container.find(structural_selector).addClass(class_muted)
}

function unmuteAllStructural() {
  container.find(structural_selector).removeClass(class_muted)
}

function muteAllSemantic() {
  container.find(semantic_selector).addClass(class_muted)
}

function unmuteAllSemantic() {
  container.find(semantic_selector).removeClass(class_muted)
}

$(document).ready(function () {
  
  $('[href="#collapseStructural"],[href="#collapseSemantic"]').on('click', function () {
    $(this).find('i.fa-caret-down').toggleClass('invisible')
    $(this).find('i.fa-caret-right').toggleClass('invisible')
  })

  $('#changeStateStructural').on('change', function () {

    let state = $(this).prop('checked')
    $('#collapseStructural').find('input').prop('checked', state)

      !state ? muteAllStructural() : unmuteAllStructural()
  })

  $('#changeStateSemantic').on('change', function () {

    let state = $(this).prop('checked')
    $('#collapseSemantic>a').find('input').prop('checked', state)

      !state ? muteAllSemantic() : unmuteAllSemantic()
  })
})

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})