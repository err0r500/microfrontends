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
    }


initialState : Json.Value -> ( Model, Cmd Msg )
initialState attrs =
    ( { count = 0
      }
    , Cmd.batch
        [ loadWebComponent "vue-hello-world"
        , loadWebComponent "react-hello-world"
        , loadWebComponent "vanilla-hello-world"
        ]
    )


type Msg
    = UpdateCounter Int
    | LoadComponent String


port loadWebComponent : String -> Cmd msg


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        LoadComponent str ->
            ( model, loadWebComponent str )

        UpdateCounter by ->
            { model | count = model.count + by } ! []


vanillaComponent : List (Html.Attribute a) -> List (Html a) -> Html a
vanillaComponent =
    Html.node "vanilla-hello-world"


reactComponent : List (Html.Attribute a) -> List (Html a) -> Html a
reactComponent =
    Html.node "react-hello-world"


vueComponent : List (Html.Attribute a) -> List (Html a) -> Html a
vueComponent =
    Html.node "vue-hello-world"


view : Model -> Html Msg
view model =
    Html.div
        [ Html.Attributes.style
            [ ( "font-size", "30px" )
            , ( "text-align", "center" )
            ]
        ]
        [ Html.div
            [ Html.Attributes.style
                [ ( "background-color", "#BE6C84" )
                ]
            ]
            [ h2 [] [ Html.text "elm" ]
            , button [ Html.Events.onClick <| UpdateCounter 5 ] [ Html.text "Click me to increment by 5" ]
            , p [] [ Html.text "Counter = ", span [] [ Html.text <| toString model.count ] ]
            ]
        , vanillaComponent
            [ Html.Attributes.attribute "counter-value" (toString model.count)
            , Html.Events.onClick <| UpdateCounter 1
            ]
            []
        , reactComponent
            [ Html.Attributes.attribute "countervalue" (toString model.count)
            , Html.Events.on "custom-event" (Json.succeed <| UpdateCounter 100)
            ]
            []
        , vueComponent
            [ Html.Attributes.attribute "countervalue" (toString model.count)
            , Html.Events.on "custom-event" (Json.succeed <| UpdateCounter -5)
            ]
            []
        ]
