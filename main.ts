namespace SpriteKind {
    export const customer = SpriteKind.create()
    export const pizza_customer = SpriteKind.create()
    export const eggsntoast_customer = SpriteKind.create()
    export const pizza_projectile = SpriteKind.create()
    export const eggsntoast_projectile = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Player, myTiles.tile2, function (sprite, location) {
    if (holding_cheese == false) {
        holding_cheese = true
        ingredient_count += 1
    }
})
scene.onOverlapTile(SpriteKind.Player, myTiles.tile3, function (sprite, location) {
    if (holding_tomato == false) {
        holding_tomato = true
        ingredient_count += 1
    }
})
function resetIngredients () {
    holding_egg = false
    holding_dough = false
    holding_cheese = false
    holding_toast = false
    holding_tomato = false
    ingredient_count = 0
    has_pizza = false
    has_eggsntoast = false
    mySprite.setImage(img`
        . . . . f f f f f f . . . . . . 
        . . . f 1 1 1 1 1 1 f f . . . . 
        . . f 1 1 1 1 1 1 1 1 f f . . . 
        . . f 1 1 1 1 1 1 1 1 1 f . . . 
        . f 1 1 1 1 1 1 1 1 1 1 f . . . 
        . f 1 1 f f f f 1 1 1 1 f . . . 
        . f f f 1 1 1 f f f f f f f . . 
        . f 1 1 4 4 f b e 4 4 6 f f . . 
        . . f 1 d d f 1 4 d 4 6 6 f . . 
        . . . f d d d d 4 6 6 6 f . . . 
        . . . f e 4 4 4 6 6 f f . . . . 
        . . . f 1 1 1 e d d 4 . . . . . 
        . . . f 1 1 1 e d d e . . . . . 
        . . . f 1 1 1 f e e f . . . . . 
        . . . . f f f f f f . . . . . . 
        . . . . . . f f f . . . . . . . 
        `)
}
scene.onOverlapTile(SpriteKind.Player, myTiles.tile4, function (sprite, location) {
    if (holding_dough == false) {
        holding_dough = true
        ingredient_count += 1
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (has_pizza) {
        projectile = sprites.createProjectileFromSprite(img`
            . . . . . . b b b b . . . . . . 
            . . . . . . b 4 4 4 b . . . . . 
            . . . . . . b b 4 4 4 b . . . . 
            . . . . . b 4 b b b 4 4 b . . . 
            . . . . b d 5 5 5 4 b 4 4 b . . 
            . . . . b 3 2 3 5 5 4 e 4 4 b . 
            . . . b d 2 2 2 5 7 5 4 e 4 4 e 
            . . . b 5 3 2 3 5 5 5 5 e e e e 
            . . b d 7 5 5 5 3 2 3 5 5 e e e 
            . . b 5 5 5 5 5 2 2 2 5 5 d e e 
            . b 3 2 3 5 7 5 3 2 3 5 d d e 4 
            . b 2 2 2 5 5 5 5 5 5 d d e 4 . 
            b d 3 2 d 5 5 5 d d d 4 4 . . . 
            b 5 5 5 5 d d 4 4 4 4 . . . . . 
            4 d d d 4 4 4 . . . . . . . . . 
            4 4 4 4 . . . . . . . . . . . . 
            `, mySprite, 0, 50)
        projectile.setKind(SpriteKind.pizza_projectile)
        resetIngredients()
    } else if (has_eggsntoast) {
        projectile = sprites.createProjectileFromSprite(img`
            . . . . c c c b b b b b . . . . 
            . . c c b 1 1 1 1 1 1 b b b . . 
            . c c 1 1 1 1 1 1 1 1 1 1 b c . 
            . e 1 1 1 1 1 1 1 1 1 1 1 1 e . 
            e b 1 1 1 1 5 5 5 1 1 1 1 1 b c 
            e b 1 1 1 1 1 5 5 1 1 1 1 1 1 e 
            e b b 1 1 1 1 1 1 1 1 1 1 1 b e 
            . e b 1 1 1 1 1 1 1 1 1 1 b e . 
            8 7 e e b 1 1 1 1 1 1 b e e 6 8 
            8 7 2 e e e e e e e e e e 2 7 8 
            e 6 6 2 2 2 2 2 2 2 2 2 2 6 c e 
            e c 6 7 6 6 7 7 7 6 6 7 6 c c e 
            e b e 8 8 c c 8 8 c c c 8 e b e 
            e e b e c c e e e e e c e b e e 
            . e e b b 4 4 4 4 4 4 4 4 e e . 
            . . . c c c c c e e e e e . . . 
            `, mySprite, 0, 50)
        projectile.setKind(SpriteKind.eggsntoast_projectile)
        resetIngredients()
    }
})
sprites.onOverlap(SpriteKind.pizza_projectile, SpriteKind.pizza_customer, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy()
    info.changeScoreBy(1)
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.doorClosedNorth, function (sprite, location) {
    resetIngredients()
})
scene.onOverlapTile(SpriteKind.Player, myTiles.tile6, function (sprite, location) {
    if (holding_toast == false) {
        holding_toast = true
        ingredient_count += 1
    }
})
scene.onOverlapTile(SpriteKind.pizza_customer, sprites.dungeon.stairLarge, function (sprite, location) {
    sprite.destroy()
    info.changeLifeBy(-1)
})
scene.onOverlapTile(SpriteKind.Player, myTiles.tile5, function (sprite, location) {
    if (holding_egg == false) {
        holding_egg = true
        ingredient_count += 1
    }
})
sprites.onOverlap(SpriteKind.eggsntoast_projectile, SpriteKind.eggsntoast_customer, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy()
    info.changeScoreBy(1)
})
scene.onOverlapTile(SpriteKind.eggsntoast_customer, sprites.dungeon.stairLarge, function (sprite, location) {
    sprite.destroy()
    info.changeLifeBy(-1)
})
let customer: Sprite = null
let food_item = 0
let projectile: Sprite = null
let has_eggsntoast = false
let has_pizza = false
let holding_toast = false
let holding_dough = false
let holding_egg = false
let holding_tomato = false
let ingredient_count = 0
let holding_cheese = false
let mySprite: Sprite = null
tiles.setTilemap(tiles.createTilemap(hex`0a000800030303030303030303020303030303030303030204030503060308030702030303030303030303020303030303030303030202020202020a020202020101010101010109010101010101010101010101`, img`
    . . . . . . . . . . 
    . . . . . . . . . . 
    . . . . . . . . . . 
    . . . . . . . . . . 
    . . . . . . . . . . 
    . . . . . . . . . . 
    . . . . . . . . . . 
    . . . . . . . . . . 
    `, [myTiles.transparency16,sprites.builtin.brick,sprites.dungeon.floorLight0,sprites.castle.tileGrass1,myTiles.tile2,myTiles.tile3,myTiles.tile4,myTiles.tile5,myTiles.tile6,sprites.dungeon.stairLarge,sprites.dungeon.doorClosedNorth], TileScale.Sixteen))
mySprite = sprites.create(img`
    . . . . f f f f f f . . . . . . 
    . . . f 1 1 1 1 1 1 f f . . . . 
    . . f 1 1 1 1 1 1 1 1 f f . . . 
    . . f 1 1 1 1 1 1 1 1 1 f . . . 
    . f 1 1 1 1 1 1 1 1 1 1 f . . . 
    . f 1 1 f f f f 1 1 1 1 f . . . 
    . f f f 1 1 1 f f f f f f f . . 
    . f 1 1 4 4 f b e 4 4 6 f f . . 
    . . f 1 d d f 1 4 d 4 6 6 f . . 
    . . . f d d d d 4 6 6 6 f . . . 
    . . . f e 4 4 4 6 6 f f . . . . 
    . . . f 1 1 1 e d d 4 . . . . . 
    . . . f 1 1 1 e d d e . . . . . 
    . . . f 1 1 1 f e e f . . . . . 
    . . . . f f f f f f . . . . . . 
    . . . . . . f f f . . . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(mySprite)
info.setLife(3)
game.onUpdate(function () {
    if (holding_cheese && ingredient_count == 3 && (holding_dough && holding_tomato)) {
        mySprite.setImage(img`
            ..........ffffff....
            .........f111111ff..
            ........f11111111ff.
            ........f111111111f.
            .....5555111111111f.
            ...5555f51ffff1111f.
            ..55225f5f111fffffff
            .555555f5144fbe446ff
            5555555551ddf14d466f
            552255555fdddd4666f.
            555552255fe44466ff..
            52555225.f111edd4...
            5555555..f111edde...
            .........f111feef...
            ..........ffffff....
            ............fff.....
            `)
        has_pizza = true
    } else if (holding_egg && ingredient_count == 2 && holding_toast) {
        mySprite.setImage(img`
            ..........ffffff....
            .........f111111ff..
            ........f11111111ff.
            ...1111.f111111111f.
            ..111771f111111111f.
            .1177771f1ffff1111f.
            11117771ff111fffffff
            111177711144fbe446ff
            1111777111ddf14d466f
            155111111fdddd4666f.
            155111111fe44466ff..
            111111111f111edd4...
            1111111..f111edde...
            .........f111feef...
            ..........ffffff....
            ............fff.....
            `)
        has_eggsntoast = true
    } else {
        mySprite.setImage(img`
            . . . . f f f f f f . . . . . . 
            . . . f 1 1 1 1 1 1 f f . . . . 
            . . f 1 1 1 1 1 1 1 1 f f . . . 
            . . f 1 1 1 1 1 1 1 1 1 f . . . 
            . f 1 1 1 1 1 1 1 1 1 1 f . . . 
            . f 1 1 f f f f 1 1 1 1 f . . . 
            . f f f 1 1 1 f f f f f f f . . 
            . f 1 1 4 4 f b e 4 4 6 f f . . 
            . . f 1 d d f 1 4 d 4 6 6 f . . 
            . . . f d d d d 4 6 6 6 f . . . 
            . . . f e 4 4 4 6 6 f f . . . . 
            . . . f 1 1 1 e d d 4 . . . . . 
            . . . f 1 1 1 e d d e . . . . . 
            . . . f 1 1 1 f e e f . . . . . 
            . . . . f f f f f f . . . . . . 
            . . . . . . f f f . . . . . . . 
            `)
        has_pizza = false
        has_eggsntoast = false
    }
})
game.onUpdateInterval(5000, function () {
    food_item = randint(0, 1)
    if (food_item == 0) {
        customer = sprites.create(img`
            . . . . . . f f f f 4 4 f . . . 
            . . . . f f b f 5 4 5 5 4 f . . 
            . . . f b 3 3 e 4 5 5 5 5 f . . 
            . . f b 3 3 3 3 e 4 4 4 e f . . 
            . . f 3 3 3 3 3 3 3 3 3 3 f . . 
            . . f 3 3 3 3 e b 3 e e 3 3 f . 
            . . f 3 3 3 3 f f e e e 3 3 f . 
            . . f b b b b f b f e e e 3 f . 
            . . f b b b b e 1 f 4 4 e f . . 
            . f f b b b b f 4 4 4 4 f . . . 
            . f b b b b f f f e e e f . . . 
            . . f b b f 4 4 e d d d f . . . 
            . . . f f e 4 4 e d d d f . . . 
            . . . . f b e e b d b d b f . . 
            . . . . f f d 1 d 1 d 1 f f . . 
            . . . . . . f f b b f f . . . . 
            `, SpriteKind.pizza_customer)
        customer.say("pizza", 2000)
        customer.setPosition(-5, 110)
        customer.setVelocity(10, 0)
    } else if (food_item == 1) {
        customer = sprites.create(img`
            . . . . . . f f f f 4 4 f . . . 
            . . . . f f b f 5 4 5 5 4 f . . 
            . . . f b 3 3 e 4 5 5 5 5 f . . 
            . . f b 3 3 3 3 e 4 4 4 e f . . 
            . . f 3 3 3 3 3 3 3 3 3 3 f . . 
            . . f 3 3 3 3 e b 3 e e 3 3 f . 
            . . f 3 3 3 3 f f e e e 3 3 f . 
            . . f b b b b f b f e e e 3 f . 
            . . f b b b b e 1 f 4 4 e f . . 
            . f f b b b b f 4 4 4 4 f . . . 
            . f b b b b f f f e e e f . . . 
            . . f b b f 4 4 e d d d f . . . 
            . . . f f e 4 4 e d d d f . . . 
            . . . . f b e e b d b d b f . . 
            . . . . f f d 1 d 1 d 1 f f . . 
            . . . . . . f f b b f f . . . . 
            `, SpriteKind.eggsntoast_customer)
        customer.say("eggs'n'toast", 2000)
        customer.setPosition(-5, 110)
        customer.setVelocity(10, 0)
    }
})
forever(function () {
    mySprite.say(ingredient_count)
})
