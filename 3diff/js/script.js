container = $('#container')

const structural_selector = `span[data-diff-type="structural"]`
const semantic_selector = 'span[data-diff-type="semantic"]'
const class_muted = 'muted'
const class_old_version = 'old_version'

function changeStateStructural (type) {
  $(`span[data-diff-op="${type}"]`).toggleClass(class_muted)
}

function changeStateSemantic (type) {
  $(`span[data-diff-op="${type}"]`).toggleClass(class_muted)
}

function muteAllStructural () {
  container.find(structural_selector).addClass(class_muted)
}

function unmuteAllStructural () {
  container.find(structural_selector).removeClass(class_muted)
}

function muteAllSemantic () {
  container.find(semantic_selector).addClass(class_muted)
}

function unmuteAllSemantic () {
  container.find(semantic_selector).removeClass(class_muted)
}

function hideSidebar () {
  $('#collapseSemantic').collapse('hide')

  $('#sidebar-wrapper>div.list-group').hide()
}

function showSidebar () {
  $('#collapseSemantic').collapse('show')
  $('#sidebar-wrapper>div.list-group').show()
}

function stateCompare () {
  $('span[data-diff-type="semantic"]').removeClass(class_old_version)
  unmuteAllSemantic()
  $('#collapseSemantic input').prop('checked', true)
  $('#collapseStructural input').prop('checked', false)
  // unmuteAllStructural()
  showSidebar()
}

function stateNew () {
  $('span[data-diff-type="semantic"]').removeClass(class_old_version)
  muteAllSemantic()
  muteAllStructural()
  hideSidebar()
}

function stateOld () {
  $('span[data-diff-type="semantic"]').addClass(class_old_version)
  muteAllSemantic()
  muteAllStructural()
  hideSidebar()
}

$(document).ready(function () {
  muteAllStructural()

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

  $('#showNew').on('change', function () {
    stateNew()
  })

  $('#showCompare').on('change', function () {
    stateCompare()
  })

  $('#showOld').on('change', function () {
    stateOld()
  })
})

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
