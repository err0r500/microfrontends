port module Main exposing (..)

import Html exposing (..)
import Html.Attributes
import Html.Events
import Json.Decode as Json exposing (Decoder)


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
    , loadWebComponent "mwc-button"
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
            [ Html.text "increase in green" ]
        , wcButton
            [ Html.Attributes.attribute "raised" "false"
            , Html.Events.onClick <| UpdateCounter -1
            , Html.Events.onMouseOver <| AttributesChange { color = "red" }
            ]
            [ Html.text "decrease in red" ]
        ]
