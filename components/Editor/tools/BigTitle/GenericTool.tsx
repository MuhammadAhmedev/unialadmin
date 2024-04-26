"use client"
import ReactDOM from 'react-dom'
import type { API, BlockTool, ToolConfig } from '@editorjs/editorjs'
import React, { createElement } from 'react'

interface CustomToolOptions<TData extends Record<string, any>, TConfig extends Record<string, any>, TOpts extends Record<string, any>> {
    data: TData
    config: TConfig
    api: API
    readOnly: boolean
    component: React.ComponentType<{ onDataChange: (newData: TData) => void; readOnly: boolean; data: TData; opts: TOpts }>
    toolbox: ToolConfig
    opts?: TOpts
}

export class CustomTool<TData extends Record<string, any>, TConfig extends Record<string, any>, TOpts extends Record<string, any>> implements BlockTool {
    private api: API
    private readonly readOnly: boolean
    private data: TData
    private config: TConfig
    private component: React.ComponentType<{ onDataChange: (newData: TData) => void; readOnly: boolean; data: TData; options?: TOpts }>
    private toolbox: ToolConfig

    private readonly CSS = {
        wrapper: 'custom-tool',
    }

    private nodes = {
        holder: null as HTMLElement | null,
    }

    constructor(options: CustomToolOptions<TData, TConfig, TOpts>) {
        const { data, config, api, readOnly, component, toolbox } = options
        this.api = api
        this.readOnly = readOnly
        this.data = data
        this.config = config
        this.component = component as any
        this.toolbox = toolbox
    }

    static get isReadOnlySupported(): boolean {
        return true
    }

    render(): HTMLElement {
        const rootNode = document.createElement('div')
        rootNode.setAttribute('class', this.CSS.wrapper)
        this.nodes.holder = rootNode

        const onDataChange = (newData: TData) => {
            this.data = {
                ...newData,
            }
        }

        ReactDOM.render(<this.component onDataChange={onDataChange} readOnly={this.readOnly} data={this.data} />, rootNode)

        return this.nodes.holder
    }

    save(): TData {
        return this.data
    }

    static createTool<TData extends Record<string, any>, TConfig extends Record<string, any>, TOpts extends Record<string, any>>(
        component: React.ComponentType<{ onDataChange: (newData: TData) => void; readOnly: boolean; data: TData; opts: TOpts }>,
        toolbox: ToolConfig,
        opts?: TOpts,
    ): new (options: CustomToolOptions<TData, TConfig, TOpts>) => CustomTool<TData, TConfig, TOpts> {
        return class extends CustomTool<TData, TConfig, TOpts> {
            constructor(options: CustomToolOptions<TData, TConfig, TOpts>) {
                super({
                    ...options,
                    component: (props: any) => createElement(component, { ...props, options: opts }),
                    toolbox,
                    data: {
                        events: [],
                        ...options.data,
                    },
                })
            }

            static get toolbox() {
                return toolbox
            }
        }
    }
}