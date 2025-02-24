

import { eventBusService } from "../services/event-bus.service.js"

const { useState, useEffect, useRef } = React

export function UserMsg() {

    const [msg, setMsg] = useState(null)
    const timeoutIdRef = useRef()

    useEffect(() => {
        const unsubscribe = eventBusService.on('show-user-msg', msg => {
            setMsg(msg)
            // setTimeout(onCloseMsg, 1500)
            if (timeoutIdRef.current) {
                clearTimeout(timeoutIdRef.current)
                timeoutIdRef.current = null
            }
            timeoutIdRef.current = setTimeout(onCloseMsg, 3000)
        })

        return () => {
            unsubscribe()
        }
    }, [])

    function onCloseMsg() {
        setMsg(null)
    }

    if (!msg) return null

    return (
        <section className={"user-msg " + msg.type}>
            <p>{msg.txt}</p>
        </section>
    )
}
