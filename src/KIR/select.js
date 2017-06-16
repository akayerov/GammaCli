import React, { PropTypes, Component } from 'react';
import find from 'lodash/find';
import includes from 'lodash/includes';
import uniq from 'lodash/uniq';
import { Form, Select } from 'antd';
import classNames from 'classnames';
import formatCamelCase from 'helpers/formatCamelCase';
import styles from './styles.css';

const Option = Select.Option;
const OptGroup = Select.OptGroup;
const maxOptions = 100;

class SelectComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { searchRegex: new RegExp() };
  }

  getText(value, data) {
    const result = data.filter(d => includes([].concat(value).map(v => `${v}`), d.value)).map(d => d.text);

    return formatCamelCase(result.length > 1 ? result : result[0]);
  }

  renderOption(o) {
    return (
      <Option value={o.value} title={o.text} key={o.value}>
        {formatCamelCase(o.text)}
      </Option>
    );
  }

  renderOptions(data) {
    const groups = data.filter(d => d.group);

    if (groups.length) {
      return groups.map(g => (
        <OptGroup key={g.value} label={<span>{g.text}</span>}>
          <Option value={g.value}>{g.text}</Option>
          {data
            .filter(d => (+d.value > +g.value && +d.value < (+g.value + 100)))
            .map(o => this.renderOption(o))
          }
        </OptGroup>));
    }
    return data.map(o => this.renderOption(o));
  }

  render() {
    const {
      input, meta, options, multiple, noLabel, label, placeholder, required, addonBefore, prefix, disabled,
      labelCol, allowClear = true, wrapperCol, autoComplete, hasFeedback, addBtn, action, className, ...rest
    } = this.props;
    const { searchRegex } = this.state;
    let status = '';

    if (meta.touched) {
      if (meta.invalid) {
        status = 'error';
      }
      if (!meta.active && meta.valid) {
        status = 'success';
      }
      if (meta.asyncValidating) {
        status = 'validating';
      }
    }
    if (options.fetching) {
      status = 'validating';
    }
    let data;
    let inableSearch = false;

    if (options.data) {
      data = options.data.map(o => ({ value: `${o.id}`, text: o.name }));
    } else {
      data = options.map(o => ({
        value: `${o.Key !== undefined ? o.Key : o}`,
        text: `${o.Value || o.Description || o}`,
        group: o.GroupHeader || false
      }));
    }
    if (data.length > maxOptions) {
      inableSearch = true;
    }
    return (
      <Form.Item
        {...{ required }}
        label={addBtn ? <span>{label} {addBtn}</span> : label}
        validateStatus={status}
        hasFeedback={hasFeedback || options.fetching}
        help={meta.touched && meta.error}
        labelCol={!noLabel ? labelCol : { span: 0 }}
        wrapperCol={!noLabel ? wrapperCol : { span: 24 }}
        colon={false}
      >
        <Select
          {...rest}
          {...input}
          allowClear={allowClear}
          dropdownMatchSelectWidth={false}
          multiple={multiple}
          value={input.value ? this.getText(input.value, data) : undefined}
          onChange={(v) => {
            // Handle clear
            if (v === undefined) {
              input.onChange(v || null);
              input.onBlur();
              if (action) {
                action(null);
              }
            }
          }}
          onSelect={(v) => {
            if (multiple) {
              input.onChange(uniq([].concat(`${v}`, input.value ? input.value.map(val => `${val}`) : [])));
            } else {
              input.onChange(`${v}` || null);
              input.onBlur();
            }
            if (action) {
              action(`${v}`);
            }
          }}
          onSearch={(v) => {
            this.setState({ searchRegex: new RegExp(v, 'i') });
          }}
          onDeselect={(v) => {
            console.log(v);
            const deselected = find(data, { text: v });

            if (!deselected) {
              return;
            }
            input.onChange(input.value.map(val => `${val}`).filter(val => val !== deselected.value));
          }}
          onBlur={() => {}}
          onFocus={() => {}}
          {...{ addonBefore, placeholder, autoComplete, prefix, disabled }}
          showSearch={inableSearch}
          filterOption={false}
          className={classNames(styles.select, className, { [styles.withBtn]: addBtn })}
        >
          {inableSearch ? this.renderOptions(data.filter(o => searchRegex.test(o.text))
            .slice(0, maxOptions)) : this.renderOptions(data)}
        </Select>
      </Form.Item>
    );
  }
}

SelectComponent.propTypes = {
  input: PropTypes.object.isRequired,
  options: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]).isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  autoComplete: PropTypes.string,
  className: PropTypes.string,
  meta: PropTypes.object,
  required: PropTypes.bool,
  hasFeedback: PropTypes.bool,
  disabled: PropTypes.bool,
  multiple: PropTypes.bool,
  addonBefore: PropTypes.any,
  prefix: PropTypes.any,
  labelCol: PropTypes.object,
  wrapperCol: PropTypes.object
};

export default SelectComponent;
