port module Main exposing (..)

import Html exposing (..)
import Html.Attributes
import Html.Events
import Json.Decode as JD exposing (..)


main : Program JD.Value Model Msg
main =
    Html.programWithFlags
        { init = initialState
        , update = update
        , view = view
        , subscriptions = \_ -> Sub.none
        }


type alias Model =
    { count : Int
    , checkList : List String
    }


initialState : JD.Value -> ( Model, Cmd Msg )
initialState attrs =
    ( { count = 0
      , checkList = [ "item0", "item1", "item2", "item3" ]
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
    | AppendToChecklist String
    | DeleteFromCheckList EventPayload


port loadWebComponent : String -> Cmd msg


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        LoadComponent str ->
            ( model, loadWebComponent str )

        UpdateCounter by ->
            { model | count = model.count + by } ! []

        AppendToChecklist str ->
            { model | checkList = model.checkList ++ [ str ] } ! []

        DeleteFromCheckList indexList ->
            let
                firstIndex =
                    List.head indexList.detail
            in
                case firstIndex of
                    Nothing ->
                        ( model, Cmd.none )

                    Just index ->
                        { model | checkList = (List.take (index) model.checkList) ++ (List.drop (index + 1) model.checkList) } ! []


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
        [ Html.div [ floatLeftCol ]
            [ elmDiv model
            ]
        , Html.div [ floatLeftCol ]
            [ vanillaComponent
                [ Html.Attributes.attribute "counter-value" (toString model.count)
                , Html.Attributes.attribute "checklist-value" (toString model.checkList)
                , Html.Events.on "counter-event" (JD.succeed <| UpdateCounter 1)
                , Html.Events.on "delete-item" (JD.map DeleteFromCheckList eventDecoder)
                ]
                []
            ]
        , Html.div [ floatLeftCol ]
            [ reactComponent
                [ Html.Attributes.attribute "countervalue" (toString model.count)
                , Html.Attributes.attribute "checklistvalue" (toString model.checkList)
                , Html.Events.on "custom-event" (JD.succeed <| UpdateCounter 100)
                , Html.Events.on "delete-item" (JD.map DeleteFromCheckList eventDecoder)
                ]
                []
            ]
        , Html.div [ floatLeftCol ]
            [ vueComponent
                [ Html.Attributes.attribute "countervalue" (toString model.count)
                , Html.Attributes.attribute "checklistvalue" (toString model.checkList)
                , Html.Events.on "counter-event" (JD.succeed <| UpdateCounter -5)
                , Html.Events.on "delete-item" (JD.map DeleteFromCheckList eventDecoder)
                ]
                []
            ]
        ]


type alias EventPayload =
    { detail : List Int -- Vue passes an array in the detail field, so in order to don't be too complex, all the other events use this format
    }


eventDecoder : Decoder EventPayload
eventDecoder =
    JD.map EventPayload (field "detail" (list int))


floatLeftCol : Html.Attribute Msg
floatLeftCol =
    Html.Attributes.style
        [ ( "float", "left" )
        , ( "width", "25%" )
        ]


elmDiv : Model -> Html Msg
elmDiv model =
    Html.div
        [ Html.Attributes.style
            [ ( "background-color", "#BE6C84" )
            ]
        ]
        [ h2 [] [ Html.text "elm" ]
        , ul []
            (List.indexedMap
                (\index str -> li [ Html.Events.onClick <| DeleteFromCheckList (EventPayload [ index ]) ] [ text str ])
                model.checkList
            )
        , button [ Html.Events.onClick <| UpdateCounter 5 ] [ Html.text "Click me to increment by 5" ]
        , p [] [ Html.text "Counter = ", span [] [ Html.text <| toString model.count ] ]
        ]
