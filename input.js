//Define the default input state
const defaultInput = `# Heading Level 1
## Heading Level 2
### Heading Level 3

Link: [OpenFOAM](https://www.openfoam.com/)

\`inline code\`

\`\`\`
//code block
\`\`\`

- List
  - item

> Block Quote

![OpenFOAM Logo](https://pbs.twimg.com/profile_images/1171023226/image_400x400.png)

**bold text**

text text

`;

//React component
class MyReactComponent extends React.Component {
  constructor(props) {
    super(props);
    //Load initial state
    this.state = {
      input: defaultInput
    };
    this.handleChange = this.handleChange.bind(this);
  }
  //To get input field value
  handleChange = (event) => {
    this.setState({
      input: event.target.value
    });
  }
  render() {
    //If true, add <br> on a single line break (copies GitHub behavior on comments, but not on rendered markdown files). Requires gfm be true.
    let markdownPrev = marked(this.state.input, {breaks: true});
    //dangerouslySetInnerHTML is React’s replacement for using innerHTML in the browser DOM
    const createMarkup = () => {
      return {
        __html: markdownPrev
      };
    }
    return (
      <div>
        <div className="row text-center headerElem">
          <h1>Markdown Previewer</h1>
        </div>
        <div className="row">
          <div className="col-md-6">
            <h3>Markdown Editor</h3>
            <p>Replace the default text below and observe the output</p>
            <textarea id="editor" className="form-control p-1" value={this.state.input} onChange={this.handleChange}>
              {defaultInput}
            </textarea>
          </div>
          <div className="col-md-6">
            <h3>Output</h3>
            <p>The text is rendered as HTML below</p>
            <div id="preview" className="" dangerouslySetInnerHTML={createMarkup()}>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
ReactDOM.render(<MyReactComponent/>, document.getElementById('react-container'))