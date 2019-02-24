export function start () {
  controller.run()
}

var controller = {}

controller.run = function () {
  model.init()
  view.init()
  this.step()
}

controller.step = function () {
  var state = model.update()
  view.update(state)
  window.setTimeout(controller.step, 2000)
}

/* view */

var view = {}

view.init = function () {
  this._canvas = document.getElementById('game-of-life')
  this._canvas.width = this._compute_canvas_size()
  this._canvas.height = this._canvas.width
  this._cellSize = this._canvas.width / 30
  this._context = this._canvas.getContext('2d')
  this._context.fillStyle = '#00ffff'
  this._context.clearRect(0, 0, this._canvas.width, this._canvas.height)
}

view.update = function (grid) {
  for (var row = 0; row < grid.length; row++) {
    for (var col = 0; col < grid[row].length; col++) {
      var x = col * this._cellSize
      var y = row * this._cellSize
      if (!grid[row][col]) {
        this._context.clearRect(x, y, this._cellSize, this._cellSize)
      } else {
        this._context.fillRect(x, y, this._cellSize, this._cellSize)
      }
    }
  }
}

view._compute_canvas_size = function () {
  var width = document.body.clientWidth
  var height = document.body.clientHeight
  var size = Math.min(width, height)
  return size - (size % 30)
}

/* model */

var model = {}

model.init = function () {
  this.population = this._buildEmptyMatrix()
  for (var i = 0; i < this.population.length; i++) {
    for (var j = 0; j < this.population[0].length; j++) {
      if (Math.random() < 0.2) {
        this.population[i][j] = 1
      }
    }
  }
}

model.update = function () {
  var nextGeneration = this._buildEmptyMatrix()

  for (var i = 0; i < this.population.length; i++) {
    for (var j = 0; j < this.population[i].length; j++) {
      var neighbors = this._countNrOfAliveNeighbors(i, j, this.population)
      if (this.population[i][j]) {
        if (neighbors === 2 || neighbors === 3) {
          nextGeneration[i][j] = 1
        }
      } else {
        if (neighbors === 3) {
          nextGeneration[i][j] = 1
        }
      }
    }
  }

  this.population = nextGeneration
  return this.population
}

model._countNrOfAliveNeighbors = function (x, y, matrix) {
  var result = 0
  var boundaries = this._calculateNeighborSubmatrixBoundaries(x, y, matrix)

  for (var i = boundaries.xStart; i <= boundaries.xStop; i++) {
    for (var j = boundaries.yStart; j <= boundaries.yStop; j++) {
      if (i !== x || j !== y) {
        result += matrix[i][j]
      }
    }
  }

  return result
}

model._calculateNeighborSubmatrixBoundaries = function (i, j, matrix) {
  return {
    xStart: Math.max(0, i - 1),
    xStop: Math.min(i + 1, matrix.length - 1),
    yStart: Math.max(0, j - 1),
    yStop: Math.min(j + 1, matrix[0].length - 1)
  }
}

model._buildEmptyMatrix = function () {
  var result = []

  for (var i = 0; i < 30; i++) {
    result.push([])
    for (var j = 0; j < 30; j++) {
      result[i].push(0)
    }
  }

  return result
}
