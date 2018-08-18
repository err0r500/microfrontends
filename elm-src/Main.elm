port module Main exposing (..)

import Html exposing (..)
import Html.Attributes
import Html.Events
import Json.Decode as Json exposing (..)


main : Program Json.Value Model Msg
main =
    Html.programWithFlags
        { init = initialState
        , update = update
        , view = view
        , subscriptions = \_ -> Sub.none
        }


type alias Model =
    { count : Int
    , color : String
    }


initialState : Json.Value -> ( Model, Cmd Msg )
initialState attrs =
    ( { count = 0
      , color = "black"
      }
    , Cmd.batch
        [ loadWebComponent "mwc-button"
        , loadWebComponent "hello-world"
        ]
    )


type alias Attributes =
    { color : String }


type Msg
    = UpdateCounter Int
    | LoadComponent String
    | AttributesChange Attributes


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        LoadComponent str ->
            ( model, loadWebComponent str )

        UpdateCounter by ->
            { model | count = model.count + by } ! []

        AttributesChange attributes ->
            { model | color = attributes.color } ! []


loadWebComponent : String -> Cmd Msg
loadWebComponent str =
    load str


wcButton : List (Html.Attribute a) -> List (Html a) -> Html a
wcButton =
    Html.node "mwc-button"


helloWorld : List (Html.Attribute a) -> List (Html a) -> Html a
helloWorld =
    Html.node "hello-world"


port load : String -> Cmd msg


view : Model -> Html Msg
view model =
    Html.div [ Html.Attributes.style [ ( "color", model.color ), ( "font-size", "30px" ), ( "text-align", "center" ) ] ]
        [ Html.div [] [ Html.text <| toString model.count ]
        , wcButton
            [ Html.Attributes.attribute "raised" "true"
            , Html.Events.onClick <| UpdateCounter 1
            , Html.Events.onMouseOver <| AttributesChange { color = "green" }
            ]
            [ Html.text "slot : increase in green" ]
        , wcButton
            [ Html.Attributes.attribute "raised" "false"
            , Html.Attributes.attribute "label" "label : decrease in red"
            , Html.Events.onClick <| UpdateCounter -1
            , Html.Events.onMouseOver <| AttributesChange { color = "red" }
            ]
            []
        , helloWorld
            [ Html.Attributes.attribute "mytext" (toString model.count)
            , Html.Events.on "customEvent" (Json.succeed <| UpdateCounter 100)
            ]
            []
        ]
